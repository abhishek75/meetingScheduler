import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';


// Import Core components
import { AlertComponent } from './alert/alert.component';
import { NavComponent } from './nav/nav.component';

// Import Core Services
import { AlertService } from './alert/alert.service';
import { AuthenticationService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/noAuth.guard';
import { ErrorInterceptor } from './interceptors/httpError.interceptor';
import { CoreApiService } from './services/core-api.service';
import { MaterialModule } from '@app/shared/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { HttpService } from './services/httpServices/http.service';
import { JwtAuthService } from './services/jwt-token/jwt-auth.service';
import { RouterDataService } from './services/router-data/router-data.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';



@NgModule({
  declarations: [NavComponent, AlertComponent],

  exports: [NavComponent, AlertComponent, CommonModule, FormsModule, ReactiveFormsModule, NgxMaterialTimepickerModule],

  imports: [
    CommonModule, // needed to use ngFor, etc.
    FormsModule, // For form directives
    MaterialModule,
    SharedModule,
    HttpClientModule, // provides http Client
    ReactiveFormsModule, // For directives related to form validation
    RouterModule, // For routing directives,
    NgxMaterialTimepickerModule
  ],

  providers: [
    AlertService,
    AuthGuard,
    NoAuthGuard,
    AuthenticationService,
    CoreApiService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    HttpService,
    JwtAuthService,
    RouterDataService,
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error(`Duplicate Import: Reimporting core module!`);
    }
  }

}
