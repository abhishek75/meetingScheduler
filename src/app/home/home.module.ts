import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './homepage/homepage.component';
import { SharedModule } from '@app/shared/shared.module';
import { DashboardModule } from '@app/dashboard-home/dashboard-home.module';

@NgModule({
  declarations: [HomePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    DashboardModule,
  ],
  exports: [HomePageComponent]
})
export class HomeModule { }
