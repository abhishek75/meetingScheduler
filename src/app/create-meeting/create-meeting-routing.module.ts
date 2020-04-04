import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '@app/create-meeting/homepage/homepage.component';

const routes: Routes = [
    { path: 'create-meeting',
      component: HomePageComponent,
      data: { breadcrumb: 'create-meeting'}
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateMeetingRoutingModule {
}
