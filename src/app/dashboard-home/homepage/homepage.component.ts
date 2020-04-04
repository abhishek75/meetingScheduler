import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import { AlertService } from '@app/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Constants } from '../shared/constants/constants';
import { BreadcrumbsComponent } from '@app/shared/breadcrumbs/breadcrumbs.component';
import { DashboardApiService } from '../shared/services/dashboard-api.service';
import { RouterDataService } from '@app/core/services/router-data/router-data.service';
import { DashboardFile } from '@app/shared/types/dashboard-file.model';
import { element } from 'protractor';
import { DashboardModel } from '@app/dashboard-home/shared/models/dashboard.model';

@Component({
  templateUrl: './homepage.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  selectedFiles: DashboardFile[] = [];
  dashboardFiles: DashboardFile[] = [];
  dashBoardListPoller: Subscription;
  room_id: number;


  // Contains table selections
  selectedSets: DashboardModel.DashboardDataObjectType[] = [];
  selectedDocument: DashboardModel.DashboardDataObjectType;
  dashboardSets: DashboardModel.DashboardDataObjectType[] = [new DashboardModel.DashboardDataObjectType()];
  dashboardSetsResponseStatus = Constants.FETCHING;
 
  numberOfDocumentsShownPerPage: number;
  totalNumberOfDocuments: number;
  totalNumberOfBatches: number;
  numberOfBatchesShownPerPage: number;
  pageIndex = 0;
  currentPageNumber = 1;
  pageSize = 10;
  @ViewChild(BreadcrumbsComponent, { static: false }) breadcrumbsComponent: BreadcrumbsComponent;

  constructor(
    private alertService: AlertService,
    private dashboardApiService: DashboardApiService,
    private routerDataService: RouterDataService
  ) {}

  ngOnInit() {
    this.dashboardSets = [];
    this.alertService.hide();
  }

  ngOnDestroy() {
    if (this.dashBoardListPoller) {
      this.dashBoardListPoller.unsubscribe();
    }
  }

// *************************************** Set Documents related functionlity******************************************************
  pollDashboardList(room_id: number, pagination_page_number: number, documents_per_page?: number) {
    this.dashBoardListPoller = interval(100000)
        .pipe(
          startWith(0),
          switchMap(() => this.dashboardApiService.requestPaginatedDashboardset(room_id, pagination_page_number, documents_per_page))
        )
        .subscribe((res: any) => {
          if (typeof(res) === 'string') {
            res = JSON.parse(res);
          }
          if (res.results.length === 0) {
            this.dashboardSetsResponseStatus = Constants.NOT_FOUND;
          }
          if (res.results.length > 0) {
            this.dashboardSetsResponseStatus = '';
          }
          this.dashboardSets = res.results;
          this.totalNumberOfDocuments = res.count;
          this.numberOfDocumentsShownPerPage = res.document_per_page;
        },
        (err) => {
          this.dashBoardListPoller.unsubscribe();
          if (err.error) {
            this.alertService.showMessage(err.error.message);
          }
        });
  }

  handleDashboardPaginationPageChangeEvent(event: PageEvent) {
    if (event) {
      let page_id = event.pageIndex + 1;
      let page_size = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.dashBoardListPoller.unsubscribe();
      this.currentPageNumber = page_id;
      this.pageSize = page_size;
      this.unsubscribePoll();
      this.pollDashboardList(this.room_id, page_id, page_size);
    }
  }

  collectSelectedSets(event: any) {
    this.selectedSets = event;
  }

  trashSets() {
    this.alertService.showConfirmation(`Are you sure you want to delete
      ${this.selectedSets.length} ${ this.selectedSets.length === 1 ? 'meeting' : 'meetings'}?
      \nYou can't undo this action.`, {
        yesText: 'Yes',
        noText: 'No',
        callback: (status) => {
          this._trashSets(status);
        }
    });
  }

  /** Actually handles deletion of Sets upon confirmation */
  _trashSets(status) {
    if (!status) {
      return;
    }
    if (this.selectedSets.length  === 0) {
      this.alertService.showConfirmation('An error occurred while' +
      'trying to delete meetings. Try again', {
        dismissOnly : true
      });
    }
    let deleteCount = 0;
    const deletedSets = this.selectedSets;
    this.alertService.showProgress('Deleting selected meetings...', 0);
    this.requestBulkDeletionOfSelectedMeetings(deletedSets);
  }

  requestBulkDeletionOfSelectedMeetings(deletedSets: DashboardModel.DashboardDataObjectType[]) {
    let ids: number[] = deletedSets.map((elements) => {
      return elements.meeting_id;
    });
    this.dashboardApiService.deleteDashboardSet(this.room_id, ids);
    this.alertService.hide();
    this.alertService.showMessage('Successfully deleted meeting');
    this.unsubscribePoll();
    this.pollDashboardList(this.room_id, this.currentPageNumber, this.pageSize);
  }

  handleRoomChange(event?: DashboardModel.RoomDetailsDataType) {
    this.room_id = event ? event.id : this.room_id; 
    this.unsubscribePoll();
    this.pollDashboardList(this.room_id, this.currentPageNumber, this.pageSize);
  }

  // updateBookingStatus() {
  //   const currentDate = new Date();
  //   const currentHour = currentDate.getHours();
  //   const currentMinute = currentDate.getMinutes();
  //   const date = new Date(); 
  //   const now = date.getHours() * 60 + date.getMinutes();
   
  //   this.dashboardSets =  this.dashboardSets.map((element) => {
  //     const startTime = element.start_time.split(':');
  //     const endTime = element.end_time.split(':');
  //     const start = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
  //     const end =  parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
  //     if(start <= now && now <= end){
  //       element.status = 'In Use';
  //     }
  //     return element;
  //   });
  // }

  unsubscribePoll(){
    if(this.dashBoardListPoller){
      this.dashBoardListPoller.unsubscribe();
    }
  }
}
