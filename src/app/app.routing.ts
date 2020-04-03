import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, NoAuthGuard } from '@app/core';

import { LoginComponent } from './views/login/login.component';
import { HomePageComponent } from './home/homepage/homepage.component';



const appRoutes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
        canActivate: [AuthGuard]
    },
    {   path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard] },
    {
        path: '**',
        redirectTo: 'home',
        canActivate: [AuthGuard]
    }
];

export const routing = RouterModule.forRoot(appRoutes);
