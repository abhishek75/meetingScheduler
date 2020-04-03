import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertState {
  show: boolean;
  showOverlay: boolean;
  isMessage: boolean;
  isConfirm: boolean;
  isProgress: boolean;
  dismissOnly: boolean;
  message: string;
  progressValue: number;
  indeterminate: boolean;
  duration: number;
  confirmYesText: string|boolean;
  confirmNoText: string|boolean;
  confirmCallback: Function;

}


@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<AlertState>();

  alertState = this.alertSubject.asObservable();

  constructor() { }

  /**
   * Show a message alert for given duration (millis) with given message
   */
  showMessage(message: string, duration: number = 5000) {
    this.alertSubject.next(<AlertState>{
        show: true,
        isMessage: true,
        message: message,
    });

    // Dismiss message after duration
    setTimeout(() => {
        this.hide();
    }, duration);
  }

  /**
   * Show a confirmation alert with options to dismiss or accept
   */
  showConfirmation(
    message: string,
    options?: {
      dismissOnly?: boolean;
      yesText?: string|boolean;
      noText?: string|boolean;
      callback?: Function;
    }) {
    this.alertSubject.next(<AlertState>{
        show: true,
        isConfirm: true,
        showOverlay: true,
        message: message,
        dismissOnly: options.dismissOnly || false,
        confirmYesText: options.yesText || false,
        confirmNoText: options.noText || false,
        confirmCallback: options.callback || false,
    });
  }

  /**
   * Show a progress bar
   */
  showProgress(message: string, progressValue: number, indeterminate = false) {
    // Sanitise progress value
    progressValue = progressValue > 100 ? 100 : progressValue < 0 ? 100 : progressValue;
    this.alertSubject.next(<AlertState>{
        show: true,
        isProgress: true,
        indeterminate: indeterminate,
        showOverlay: true,
        message: message,
        progressValue: progressValue,
    });
  }

  hide() {
    this.alertSubject.next(<AlertState>{
        show: false,
        isConfirm: false,
        isMessage: false,
        isProgress: false,
    });
  }
}