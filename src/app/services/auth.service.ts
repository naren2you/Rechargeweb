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
    if (userData._id) {
      localStorage.setItem('_id', userData._id.toString());
    }
    localStorage.setItem('username', userData.f_name + ' ' + userData.l_name);
    localStorage.setItem('user_type', userData.user_type.toString());
    localStorage.setItem('language', userData.language);
    this.isLoggedIn.emit(true);
  }

  getToken() {
    let userData: any = {};
    userData['token'] = localStorage.getItem('token');
    userData['username'] = localStorage.getItem('username');
    userData['user_type'] = localStorage.getItem('user_type');
    userData['language'] = localStorage.getItem('language');
    userData['_id'] = localStorage.getItem('_id');
    return userData;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  deleteToken() {
    this.isLoggedIn.emit(false);
    localStorage.clear();
  }
}
