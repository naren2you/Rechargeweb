import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string = '/home';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor() {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const userToken = this.getToken();
    if (userToken != null) {
      return true;
    } else {
      return false;
    }
  }
}
