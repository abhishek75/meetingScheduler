import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtAuthService } from '../jwt-token/jwt-auth.service';
import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private jwtTokenService: JwtAuthService
  ) { }

  authToken: string;
  httpheaders: HttpHeaders;
  httpOptions: any;

  createHttpHeader() {
    this.authToken = 'Bearer ' + this.jwtTokenService.getToken();
    this.httpheaders = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.httpOptions = {
      headers: this.httpheaders,
    };
  }

  get(path, customHttpoptions?: any) {
    this.createHttpHeader();
    return this.http.get(path, this.httpOptions);
  }

  post(path, body, customHttpoptions?: any) {
    this.createHttpHeader();
    if (customHttpoptions) {
      return this.http.post(path, body, {...this.httpOptions, ...customHttpoptions});
    }
    return this.http.post(path, body, this.httpOptions);
  }

  put(path, body, customHttpoptions?: any) {
    this.createHttpHeader();
    return this.http.put(path, body, this.httpOptions);
  }

  delete(path, customHttpoptions?: any) {
    this.createHttpHeader();
    return this.http.delete(path, this.httpOptions);
  }

  handleError(err) {
    return throwError(err);
  }
}
