import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertState, AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnDestroy, OnInit {

  // Alert type and visibility flags
  visible = false;
  showOverlay = false;
  isMessage = false;
  isConfirm = false;
  isProgress = false;
  progressValue = 100;
  indeterminate = false;
  dismissOnly = false;
  confirmYesText: string|boolean = false;
  confirmNoText: string|boolean = false;
  duration = 0;
  confirmCallback: Function = null;

  // Data for alert
  message = '';

  // Alert state observer
  private alertStateChanged: Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  confirm(state: boolean) {
    this.visible = false;
    this.showOverlay = false;
    this.message = '';
    this.confirmYesText = false;
    this.confirmNoText = false;
    this.isConfirm = false;
    if (this.confirmCallback !== null) {
      this.confirmCallback(state);
    }
  }

  ngOnInit() {
    this.alertStateChanged = this.alertService.alertState
      .subscribe((state: AlertState) => {
        this.visible = state.show;
        this.isMessage = state.isMessage || false;
        this.isConfirm = state.isConfirm || false;
        this.showOverlay = state.showOverlay || false;
        this.isProgress = state.isProgress || false;
        this.indeterminate = state.indeterminate || false;
        this.progressValue = state.progressValue || 100;
        this.dismissOnly = state.dismissOnly || false;
        this.confirmYesText = state.confirmYesText || false;
        this.confirmNoText = state.confirmNoText || false;
        this.confirmCallback = state.confirmCallback || null;
        this.message = state.message;
      });
  }

  ngOnDestroy() {
    this.alertStateChanged.unsubscribe();
  }

}
