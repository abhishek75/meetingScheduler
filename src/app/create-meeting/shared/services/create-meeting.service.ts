import { Injectable } from '@angular/core';
import { sampleDashboardData } from '../../../dashboard-home/shared/sampleDashboard';
import { DashboardModel } from '@app/dashboard-home/shared/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class CreateMeetingService {
  sampleDashboardData = sampleDashboardData;
  constructor() { }

  scheduleMeeting(room_id: number, payload: DashboardModel.DashboardDataObjectType) {
    this.sampleDashboardData.count++;
    this.sampleDashboardData.results.forEach((room: DashboardModel.RoomDetailsDataType) => {
      if(room.id === room_id){
        room.data.unshift(payload);
      }
    });
  }
}
