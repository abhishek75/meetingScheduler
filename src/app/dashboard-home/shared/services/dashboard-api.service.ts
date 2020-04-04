import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Constants } from '../constants/constants';
import { DashboardModel } from '../models/dashboard.model';
import { HttpService } from '@app/core';
import { sampleDashboardData } from '../sampleDashboard';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  path = new Constants.Path();
  sampleDashboardData = sampleDashboardData;
  sampleDashboardResponse =  new BehaviorSubject(this.sampleDashboardData);
  sampleRoomDetailsResponse= new BehaviorSubject(this.sampleDashboardData.results);
  constructor(
    private httpService: HttpService,
  ) { }

  getDashboardSets(data?: any) {
    let path = `/api/dashboard/`;
    let request_payload = data ? data : {};
    return  this.httpService.post(path, request_payload).pipe(
              map(response => <DashboardModel.DashboardDataObjectType[]><unknown> response)
            );
  }

  requestRoomsDetails() {
    this.sampleRoomDetailsResponse.next(this.sampleDashboardData.results);
    return this.sampleRoomDetailsResponse;
  }

  requestPaginatedDashboardset(room_id: number, pagination_page_number: number, documents_per_page?: number) {
    let url_component = [Constants.CORE, Constants.FILE_LISTING, Constants.REGULAR];
    let queryParam = [{name: Constants.PAGE, value: pagination_page_number},
    {name: Constants.ITEMS_PER_PAGE, value: documents_per_page}];
    let api_url = this.path.generateParamPath(url_component, queryParam);
    
    const end = (pagination_page_number) * documents_per_page;
    const start = (pagination_page_number - 1) * documents_per_page;
    let results = [];
    this.sampleDashboardData.results.forEach((element) => {
      if(element.id === room_id) {
        results = [...element.data];

      }
    });
    const part = results.slice(start, end);
    let newResponse = {...this.sampleDashboardData};
    newResponse.document_per_page = documents_per_page;
    newResponse.results =  part;
    newResponse.count = part.length;
    this.sampleDashboardResponse.next(newResponse);
    return  this.sampleDashboardResponse;
  }

  deleteDashboardSet(room_id: number, meeting_ids: number[]){
    this.sampleDashboardData.results.forEach((element) => {
      if(element.id === room_id) {
        element.data  = element.data.filter((el) => {
          if(!meeting_ids.includes(el.id)) {
            return el;
          }
        })
      }
    });
  }

}
