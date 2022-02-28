import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//rxjs
import { map } from 'rxjs/operators';

// Services
import { AuthService } from './auth.service';

//thirdparty
import { ToastrService } from 'ngx-toastr';

//models
import { Users } from 'src/models/users';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost/angularCURD/';

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

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
      .request('post', this.baseUrl + 'login.php', { body: userData })
      .pipe(
        map((userres: any) => {
          if (userres.msg == 'Success') {
            if (userres?.body[0]) {
              this.auth.setToken(userres?.body[0]);
              this.toastr.success(
                userres?.body[0].f_name + ' ' + userres?.body[0].l_name,
                'Welcome!'
              );
            }

            return userres.body;
          } else {
            this.toastr.error(
              'UserName or password error.',
              'Login in Failed!'
            );
            return false;
          }
        })
      );
  }
}
