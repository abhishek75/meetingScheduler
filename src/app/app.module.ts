import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { routing } from './app.routing';
import { SharedModule } from '@app/shared/shared.module';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    routing,
    HomeModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
