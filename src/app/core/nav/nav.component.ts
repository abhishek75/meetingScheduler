import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';

import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  get isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  get showHome() {
    if (this.router.url === '/' || this.router.url.includes('/login')) {
      return false;
    }
    return true;
  }

  toggleNotifications() {
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  updateNotificationCount() {
  }

  ngOnInit() {
  }

  clickOutside(event: Object) {
    
  }
}
