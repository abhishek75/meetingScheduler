import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import { AlertService } from '@app/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DashboardModel } from '../shared/models/dashboard.model';
import { Constants } from '../shared/constants/constants';
import { BreadcrumbsComponent } from '@app/shared/breadcrumbs/breadcrumbs.component';
import { DashboardApiService } from '../shared/services/dashboard-api.service';
import { RouterDataService } from '@app/core/services/router-data/router-data.service';
import { DashboardFile } from '@app/shared/types/dashboard-file.model';

@Component({
  templateUrl: './homepage.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  selectedFiles: DashboardFile[] = [];
  dashboardFiles: DashboardFile[] = [];
  dashBoardListPoller: Subscription;


  // Contains table selections
  selectedSets: DashboardModel.DashboardDataObjectType[] = [];
  selectedDocument: DashboardModel.DashboardDataObjectType;
  dashboardSets: DashboardModel.DashboardDataObjectType[] = [new DashboardModel.DashboardDataObjectModel()];
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
    this.pollDashboardList(1, 10);
  }

  ngOnDestroy() {
    if (this.dashBoardListPoller) {
      this.dashBoardListPoller.unsubscribe();
    }
  }

// *************************************** Set Documents related functionlity******************************************************
  pollDashboardList(pagination_page_number: number, documents_per_page?: number) {
    this.dashBoardListPoller = interval(25000)
        .pipe(
          startWith(0),
          switchMap(() => this.dashboardApiService.requestPaginatedDashboardset(pagination_page_number, documents_per_page))
        )
        .subscribe((res: DashboardModel.DashboardTableResponseType) => {
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
      this.pollDashboardList(page_id, page_size);
    }
  }

  collectSelectedSets(event: any) {
    this.selectedSets = event;
  }

  trashSets() {
    this.alertService.showConfirmation(`Are you sure you want to delete
      ${this.selectedSets.length} ${ this.selectedSets.length === 1 ? 'Job' : 'Jobs'}?
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
      'trying to delete Jobs. Try again', {
        dismissOnly : true
      });
    }
    let deleteCount = 0;
    const deletedSets = this.selectedSets;
    this.alertService.showProgress('Deleting selected jobs...', 0);
    this.requestBulkDeletionOfSelectedJobs(deletedSets);
  }

  requestBulkDeletionOfSelectedJobs(deletedSets: DashboardModel.DashboardDataObjectType[]) {
    let ids: number[] = deletedSets.map((elements) => {
      return elements.job_id;
    });
    this.dashboardApiService.deleteDashboardSet(ids);
    this.alertService.hide();
    this.pollDashboardList(this.currentPageNumber, this.pageSize);
  }
}
