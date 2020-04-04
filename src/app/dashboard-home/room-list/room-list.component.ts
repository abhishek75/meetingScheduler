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
  
}
