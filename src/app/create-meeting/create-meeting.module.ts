import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './homepage/homepage.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material.module';
import { CreateMeetingRoutingModule } from './create-meeting-routing.module';
import { CoreModule } from '@app/core/core.module';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CreateMeetingRoutingModule,
    CoreModule
  ],
  declarations: [
    HomePageComponent, CreateMeetingComponent
  ],
  providers: [],
  exports: [HomePageComponent]
})
export class CreateMeetingModule { }
