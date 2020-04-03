import { Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'sfg-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
})
export class DashboardSettingsComponent {
  @Input() toggle: boolean;
  @Output() toggleChange = new EventEmitter<boolean>();

  close() {
    this.toggle = false;
    this.toggleChange.emit(false);
  }

}
