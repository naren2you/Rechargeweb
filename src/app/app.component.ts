import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loginInUser: string = 'Guest';
  isLoggedIn: boolean = false;
  userData: any;
  constructor(private auth: AuthService) {
    this.auth.isLoggedIn.subscribe((x) => {
      this.isLoggedIn = x;
    });
  }

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logOut() {
    this.auth.deleteToken();
    window.location.href = window.location.href;
  }
}
