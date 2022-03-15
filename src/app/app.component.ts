import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loginInUser: string = 'Guest';
  isLoggedIn: boolean = false;
  loggedInUserData: any;
  constructor(private auth: AuthService) {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }

    this.auth.isLoggedIn.subscribe((x) => {
      this.initializePage();
    });
  }

  ngOnInit(): void {
    this.initializePage();
  }

  initializePage() {
    if (this.auth.loggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.loggedInUserData = this.auth.getToken();
    console.log(this.loggedInUserData);
    if (this.loggedInUserData?.username) {
      this.loginInUser = this.loggedInUserData.username;
    }
  }
  logOut() {
    this.auth.deleteToken();
    window.location.href = window.location.href;
  }
}
