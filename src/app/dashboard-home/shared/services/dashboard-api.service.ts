import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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
    
  constructor(
    private httpService: HttpService,
    private http: HttpClient
  ) { }

  getDashboardSets(data?: any) {
    let path = `/api/dashboard/`;
    let request_payload = data ? data : {};
    return  this.httpService.post(path, request_payload).pipe(
              map(response => <DashboardModel.DashboardDataObjectType[]><unknown> response)
            );
  }

  requestPaginatedDashboardset(pagination_page_number: number, documents_per_page?: number) {
    let url_component = [Constants.CORE, Constants.FILE_LISTING, Constants.REGULAR];
    let queryParam = [{name: Constants.PAGE, value: pagination_page_number},
    {name: Constants.ITEMS_PER_PAGE, value: documents_per_page}];
    let api_url = this.path.generateParamPath(url_component, queryParam);
    // let api_url =  this.path.generatePath(url_component);
    const end = (pagination_page_number) * documents_per_page;
    const start = (pagination_page_number - 1) * documents_per_page;
    const part = this.sampleDashboardData.results.slice(start, end);
    let newResponse = {...this.sampleDashboardData};
    newResponse.document_per_page = documents_per_page;
    newResponse.results =  part;
    this.sampleDashboardResponse.next(newResponse);
    return  this.sampleDashboardResponse;
  }

  deleteDashboardSet(id: number[]){
    this.sampleDashboardData.results = this.sampleDashboardData.results.filter((element) => {
      if(!id.includes(element.job_id)) {
        return element;
      }
    });
  }

}
