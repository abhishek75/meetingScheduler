import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSettingsComponent } from '@app/dashboard-home/homepage/homepage-settings/dashboard-settings.component';
import { MaterialModule } from '@app/shared/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { HomePageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardApiService } from './shared/services/dashboard-api.service';




const routes: Routes = [
  { path: 'dashboard',
    component: HomePageComponent,
    data: { breadcrumb: 'Dashboard'}
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardSettingsComponent,
    HomePageComponent,
    DashboardComponent
  ],
  providers: []
})
export class DashboardModule { }
