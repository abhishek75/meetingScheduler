import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/core';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private alertService: AlertService) { }

  ngOnInit() {
  }

  notify() {
  }

  disabled() {
    this.alertService.showMessage('You have not subscribed to access this feature.', 1200);
  }
}
