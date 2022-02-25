import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Mobile recharge';
  loginInUser: string = 'Guest';
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {
    auth.getLoggedInName.subscribe((islogin) => {
      if (islogin) {
        this.isLoggedIn = true;
      }
    });
  }

  logOut() {
    this.auth.deleteToken();
    window.location.href = window.location.href;
  }
}
