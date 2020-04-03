import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RouterDataService } from '@app/core/services/router-data/router-data.service';
import { AlertService } from '@app/core';
import { HomeApiService } from '../shared/services/home-api/home-api.service';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';

@Component({
  selector: 'home-home-page',
  templateUrl: './homepage.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  @ViewChild('picker', {static: false}) picker: NgxMaterialTimepickerComponent;
  
  constructor(
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.alertService.hide();
  }
  
  ngOnDestroy() {
  }
}
