import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sampleDashboardData } from '../../dashboard-home/shared/sampleDashboard';
import { DashboardModel } from '@app/dashboard-home/shared/models/dashboard.model';
import { AlertService } from '@app/core';
import { CreateMeetingService } from '../shared/services/create-meeting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {
  createMeetingForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  rooms: DashboardModel.RoomDetailsDataType[] = [];
  startTime = '';
  endTime = '';
  constructor(
    private formBuilder: FormBuilder, 
    private alertService: AlertService,
    private createMeetingService: CreateMeetingService,
    private router: Router
     ) {}

  ngOnInit() {
    this.createMeetingForm = this.formBuilder.group({
      username: ['', Validators.required],
      room: ['', Validators.required],
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      agenda: ['', Validators.required],
    });
    this.getRoomDetails();
  }

 get f() { return this.createMeetingForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createMeetingForm.invalid) {
      this.alertService.showMessage('Please fill in all the required fields');
        return;
    }
    if (!this.checkIfBookingTimeValid() ) {
      this.alertService.showMessage('Invalid Meeting Hours. Minimum 30 minutes of meeting should be scheduled with valid Start time and End time');
        return;
    }
    if(!this.isStartTimeGreaterThanCurrentTime()){
      this.alertService.showMessage('Invalid Meeting Start Time.');
      return false;
    }
    let meetingRoomId = this.createMeetingForm.get('room').value;
    let meetingRoomDetail = new DashboardModel.DashboardDataObjectType();
    meetingRoomDetail.id = sampleDashboardData.count++;
    meetingRoomDetail.meeting_id = meetingRoomDetail.id;
    meetingRoomDetail.meeting_room = 'Room_' + meetingRoomId;
    meetingRoomDetail.start_time = this.createMeetingForm.get('start_time').value;
    meetingRoomDetail.end_time = this.createMeetingForm.get('end_time').value;
    meetingRoomDetail.user_name = this.createMeetingForm.get('username').value;
    meetingRoomDetail.date = this.createMeetingForm.get('date').value;
    meetingRoomDetail.agenda = this.createMeetingForm.get('agenda').value;
    meetingRoomDetail.status = 'BOOKED'
    this.createMeetingService.scheduleMeeting(meetingRoomId, meetingRoomDetail);
    this.router.navigate(['/dashboard']);

  }

  private checkIfBookingTimeValid(){
    let startTime = this.startTime.split(':');
    let endTime = this.endTime.split(':');

    if (parseInt(endTime[0]) < parseInt(startTime[0])) {
      return false;
    } else if(parseInt(endTime[0])=== parseInt(startTime[0])) {
      if(parseInt(endTime[1]) < parseInt(startTime[1])){
        return false;
      } else if (Math.abs(parseInt(endTime[1]) - parseInt(startTime[1])) < 30) {
        return false;
      }
    } else if(parseInt(endTime[0]) > parseInt(startTime[0])) {
      if (60 - parseInt(startTime[1]) + parseInt(endTime[1]) < 30) {
        return false;
      }
    } 
    return true;

  }

  dayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
}

   getRoomDetails() { 
     this.rooms = sampleDashboardData.results;   
  }

  getStartTime(event: string) {
    this.startTime = event;
  }

  getEndTime(event: string) {
    this.endTime = event;
  }

  isStartTimeGreaterThanCurrentTime() {
    const date = new Date(); 
    const now = date.getHours() * 60 + date.getMinutes();
    const startTime = this.startTime.split(':');
    const endTime = this.endTime.split(':');
    const start = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
    const end =  parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
    let status = false;
    if(start >= now){
      status = true;
    }
    return status;
  }

}
