import { EventEmitter, Injectable, Output } from '@angular/core';
import { Users } from 'src/models/users';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string = '/home';
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter(false);
  constructor() {}

  setToken(userData: Users) {
    localStorage.setItem('token', userData.email);
    localStorage.setItem('username', userData.f_name + ' ' + userData.l_name);
    localStorage.setItem('user_type', userData.user_type.toString());
    localStorage.setItem('language', userData.language);
    this.isLoggedIn.emit(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    this.isLoggedIn.emit(!!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  deleteToken() {
    this.isLoggedIn.emit(false);
    localStorage.clear();
  }
}
