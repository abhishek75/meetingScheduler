import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardApiService } from '../shared/services/dashboard-api.service';
import { AlertService } from '@app/core';
import { Constants } from '../shared/constants/constants';
import { DashboardModel } from '../shared/models/dashboard.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnChanges, OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<DashboardModel.DashboardDataObjectType>([]);
  selection = new SelectionModel<DashboardModel.DashboardDataObjectType>(true, []);
  renderedData: DashboardModel.DashboardDataObjectType[];
  paginatorEvent: PageEvent;
  dashboardSetStatus = this.constants.FETCHING;
  pageSizeOptions = [10, 20, 50, 100];

  @Input() paginatorPageIndex: number;
  @Input() totalNumberOfDocuments: number;
  @Input() numberOfDocumentsShownPerPage: number;
  @Input() sets: DashboardModel.DashboardDataObjectType[];
  @Input() showNLQPColumn: boolean;
  @Input() processID: number;
  @Input() selected: DashboardModel.DashboardDataObjectType[];
  @Input() dashboardSetsResponseStatus: string;
  @Output() selectedChange = new EventEmitter<DashboardModel.DashboardDataObjectType[]>();
  @Output() paginatorPageChangeEvent: EventEmitter<PageEvent> = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private dashboardApiService: DashboardApiService,
    private alertService: AlertService) {
    this.selection.changed.subscribe((data) => {
      this.selectedChange.emit(this.selection.selected);
    });
  }

  ngOnInit() {
    this.sort.sort(<MatSortable>{
        id: 'upload_date',
        start: 'desc'
      }
    );
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(d => this.renderedData = d);
   
      // this.displayedColumns = ['select', 'start_time', 'file_name', 'end_time', 'status', 'uploaded_by', 'datapoints'];
      this.displayedColumns = ['select', 'Sno','job_id', 'start_time', 'job_name',
      'end_time', 'job_type' , 'status'];

  }

  ngOnChanges(changes: SimpleChanges) {
    // Ref: https://ngdev.space/angular-2-input-property-changes-detection-3ccbf7e366d2
    const pageIndexUpdate: SimpleChange = changes.paginatorPageIndex;
    const setUpdate: SimpleChange = changes.sets;
    const selectionUpdate: SimpleChange = changes.selected;
    const dashboardSetsResponseStatus: SimpleChange =  changes.dashboardSetsResponseStatus;
    if (pageIndexUpdate) {
      this.paginatorPageIndex = pageIndexUpdate.currentValue;
    }
    if (dashboardSetsResponseStatus) {
      this.dashboardSetsResponseStatus = dashboardSetsResponseStatus.currentValue;
    }
    if (setUpdate) {
      this.sets = setUpdate.currentValue;
      this.dataSource.data = this.sets;
      this.selection.clear();
    } else if (selectionUpdate) {
      // For future use
    }
  }

  get constants() {
    return Constants;
  }

  paginatorChangeEvent(event: PageEvent) {
    this.paginatorEvent = event;
    this.paginatorPageIndex = this.paginatorEvent.pageIndex;
    this.paginatorPageChangeEvent.emit(event);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (numSelected > 0) {
      let sorted = this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
      const numRows = this.dataSource._pageData(sorted).length;
      return numSelected === numRows;
    }
    return false;
  }


  /**
   * Filters the data based on given key
   */
  applyFilter(filterValue: string) {
    this.selection.clear();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.dataSource.data.length !== 0) {
      if (this.isAllSelected()) {
          this.selection.clear();
      } else {
          this.selection.clear();
          let sorted = this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
          sorted.forEach(row => this.selection.select(row));
      }
    }
  }

  selectRow(row: DashboardModel.DashboardDataObjectType) {
    this.selection.clear();
    this.selection.select(row);
  }

  viewResults(document: DashboardModel.DashboardDataObjectType) {
    this.router.navigate(
      [`/results/${document.id}`]);
  }
}
