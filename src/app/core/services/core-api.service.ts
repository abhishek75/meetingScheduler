import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) {
    }
}
