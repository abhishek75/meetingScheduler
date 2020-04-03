import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { HttpService } from '@app/core';
import { Constants } from '../../constants/constant';
import { DashboardModel } from '@app/dashboard-home/shared/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {
  path = new Constants.Path();
  constructor(
    private httpService: HttpService,
    private http: HttpClient
  ) { }

}
