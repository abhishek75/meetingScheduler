import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
// import { AuthBackends } from '../types/types';
import { HttpService } from '../services/httpServices/http.service';
import { JwtAuthService } from '../services/jwt-token/jwt-auth.service';
import { AlertService } from '../alert/alert.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '@app/dashboard-home/shared/constants/constants';

@Injectable()
export class AuthenticationService {
    authenticatedUser = false;
    path = new Constants.Path();
    constructor(private http: HttpClient,
        private jwtTokenService: JwtAuthService,
        private httpService: HttpService,
        private alertService: AlertService,
        private router: Router) {
        this.status();
    }

    login(username: string, password: string) {
        let url_component = [Constants.USER, Constants.LOGIN];
        let api_url = this.path.generatePath(url_component);
        let path  = '/api/v1/user/login';
        let body = { username: username, password: password };
        if (username === 'demo_username' && password === 'demo_password') {
            let response  = {refresh: 'abcde', access: 'abcde'};
            let data = <{refresh: string, access: string}><unknown>response;
                this.setAuthenticationTokens(data.access);
                this.setAuthenticationTokenRefreshTime(data.refresh);
                this.authenticatedUser =  true;
                return data;

        } else {
            return null;
        }
        // return this.http.post(path, body)
        //     .pipe(map(response => {
        //         let data = <{refresh: string, access: string}><unknown>response;
        //         this.setAuthenticationTokens(data.access);
        //         this.setAuthenticationTokenRefreshTime(data.refresh);
        //         this.authenticatedUser =  true;
        //         return data;
        //     }));
    }


    isAuthenticated() {
        if (this.jwtTokenService.getToken() ) {
            this.authenticatedUser =  true;
        }
        return this.authenticatedUser;
    }

    getRouter() {
        return this.router;
    }

    // **********************************************  token functionlity **************************************
    getAuthenticationTokens() {
        let token = this.jwtTokenService.getToken();
        if (token) {
            return token;
        }
        return '';
    }

    setAuthenticationTokens(token) {
        let authentication_token = token;
        this.jwtTokenService.setToken(authentication_token);
    }

    // ********************************************** refresh token time functionlity **************************************
    getAuthenticationTokenRefreshTime() {
        let token_refresh_time = this.jwtTokenService.getTokenRefreshTime();
        return token_refresh_time;
     }

    setAuthenticationTokenRefreshTime(token_refresh_time) {
    let refresh_time = token_refresh_time;
    this.jwtTokenService.setTokenRefreshTime(refresh_time);
    }

    // ********************************* Token Decoder ***************************************8
    getTokenDecoder() {
        let token_decoder = this.jwtTokenService.requestTokenDecoder();
        return token_decoder;
    }

    getRefreshTime() {
        let token = this.getAuthenticationTokens();
        let token_decoder = this.getTokenDecoder();
        let token_details: any;
        if (token.trim() !== '' && token) {
            token_details = token_decoder(token);
        } else {
            this.alertService.showMessage('Not able to find a valid user token');
            return null;
        }
        let token_expiration_time = this.calculateRefreshTime(token_details);
        return token_expiration_time;
    }

    calculateRefreshTime(token_detail) {
        const token_expiration_time =  token_detail.exp;
        const token_initialization_time = token_detail.iat;
        let token_end_time = token_expiration_time;
        let token_start_time = token_initialization_time;
        let expiration_time = token_end_time - token_start_time;
        return expiration_time;
    }

    status() {
        return this.http.get<any>('/api/auth/status/')
            .pipe(map(data => {
                // authenticated user if server responds with authenticated flag as true
                if (data && data.authenticated === true) {
                    this.authenticatedUser = true;
                    return true;
                }
                this.authenticatedUser = false;
                return false;
            }));
    }

    logout() {
        this.authenticatedUser = false;
        this.jwtTokenService.removeToken();
        this.jwtTokenService.removeTokenRefreshTime();
        // this.router.navigate(['/login']);
    }

    refreshAuthenticationToken(authentication_token: string) {
        let path = '/api/v1//user/token-refresh';
        let body = {
            token: authentication_token
        };
        return this.httpService.post(path, body).
        pipe(map((response) => {
           return <{token: string}><unknown>response;
        }));
    }

    isLoggedIn() {
        return this.getAuthenticationTokens() !== null;
    }
}
