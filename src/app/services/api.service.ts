import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/models/users';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost/angularCURD/';

  constructor(private httpClient: HttpClient, private auth: AuthService) {}

  public userRegistration(userData: Users) {
    return this.httpClient
      .request('post', this.baseUrl + '/register.php', { body: userData })
      .pipe(
        map((resulte: any) => {
          return resulte;
        })
      );
  }

  public userLogin(userData: any) {
    return this.httpClient
      .request('post', this.baseUrl + '/login.php', { body: userData })
      .pipe(
        map((userres: any) => {
          if (userres.email) {
            this.auth.setToken(userres.email);
            this.auth.getLoggedInName.emit(true);
          }
          return userres;
        })
      );
  }
}
