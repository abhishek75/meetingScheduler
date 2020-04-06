import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertService, } from '@app/core';
import { DashboardApiService } from '../shared/services/dashboard-api.service';
import { DashboardModel } from '@app/dashboard-home/shared/models/dashboard.model';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  @Output() roomChange = new EventEmitter();
  roomItems: DashboardModel.RoomDetailsDataType[];
  start_time: string;
  end_time: string;
  date: string;
  ifFilter = false;
  constructor(private alertService: AlertService,
    private dashboardApiService: DashboardApiService
  ) { }

  ngOnInit() {
    this.getRoomsDetails();
  }

  getRoomsDetails(){
    this.dashboardApiService.requestRoomsDetails().subscribe((res: DashboardModel.RoomDetailsDataType[]) => {
      this.roomItems = res;
    });
  }

  updateSelected(event: MatCheckboxChange, room_change: DashboardModel.RoomDetailsDataType, idx:number){
    if(event.checked) {
      this.roomItems = this.roomItems.map((element) => {
          if(room_change.id !== element.id) {
            element.selected = false;
          }
          return element;
      });
      this.roomChange.emit(room_change);
    }
  }

  getStartTime(event: string) {
    this.start_time = event;
  }

  getEndTime(event: string) {
    this.end_time = event;
  }
  
  checkStatus() {
    this.alertService.showMessage('This feature will be enabled in next version.');
    // this.roomItems = this.roomItems.filter(() => {

    // })
  }

  clear(){
    this.alertService.showMessage('This feature will be enabled in next version.');
  }

  isStartTimeGreaterThanCurrentTime(meeting_start_time: string, meeting_end_time: string) {
    const date = new Date(); 
    const now = date.getHours() * 60 + date.getMinutes();

    const filter_startTime = this.start_time.split(':');
    const filter_endTime = this.end_time.split(':');
    const filter_start_minutes = parseInt(filter_startTime[0]) * 60 + parseInt(filter_startTime[1]);
    const filter_end_minutes =  parseInt(filter_endTime[0]) * 60 + parseInt(filter_endTime[1]);

    const room_meeting_start = meeting_start_time.split(':');
    const room_meeting_end = meeting_end_time.split(':');

    const room_meeting_start_minutes = parseInt(room_meeting_start[0]) * 60 + parseInt(room_meeting_start[1]);
    const room_meeting_end_minutes = parseInt(room_meeting_end[0]) * 60 + parseInt(room_meeting_end[1]); 
    let status: string;
    // to be implemented
    // if () {

    // }

    return status;
  }

  dayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  
}
