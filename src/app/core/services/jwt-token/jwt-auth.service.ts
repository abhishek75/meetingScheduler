import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  private readonly JWT_TOKEN = 'AUTH_TOKEN';
  private readonly JWT_REFRESH_TIME = 'AUTH_TOKEN_REFRESH_TIME';

  private loggedUser: string;
  token = null;

  constructor(

  ) { }

  public username;

  getToken(): string {
    let token = window.localStorage.getItem(this.JWT_TOKEN);
    return token;
  }

  setToken(token: string) {
    window.localStorage.setItem(this.JWT_TOKEN, token);
  }

  removeToken() {
    window.localStorage.removeItem(this.JWT_TOKEN);
    this.loggedUser =  null;
  }

  removeTokenRefreshTime() {
    window.localStorage.removeItem(this.JWT_REFRESH_TIME);
  }

  setTokenRefreshTime(token_JWT_REFRESH_TIME: string) {
    window.localStorage.setItem(this.JWT_REFRESH_TIME, token_JWT_REFRESH_TIME);
  }

  getTokenRefreshTime() {
    let token_JWT_REFRESH_TIME = window.localStorage.getItem(this.JWT_REFRESH_TIME);
    return token_JWT_REFRESH_TIME;
  }

  requestTokenDecoder() {
    let response_token_decoder = this.getTokenDecoder();
    return response_token_decoder;
  }

  private setTokenDecoder() {
    let token_decoder = jwt_decode;
    if (token_decoder) {
      return token_decoder;
    }
    return null;
  }

  private getTokenDecoder() {
    let token_decoder_instance;
    if (this.setTokenDecoder()) {
      token_decoder_instance = this.setTokenDecoder();
    }
    return token_decoder_instance;
  }
}
