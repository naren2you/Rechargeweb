import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
//rxjs
import { map } from 'rxjs/operators';

// Services
import { AuthService } from './auth.service';

//thirdparty
import { ToastrService } from 'ngx-toastr';

//models
import { Users } from 'src/models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = environment.ApiService_baseUrl;

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService,
    private spiner: NgxSpinnerService
  ) {}

  public userRegistration(userData: Users) {
    this.spiner.show();
    return this.httpClient
      .request('post', this.baseUrl + '/register.php', { body: userData })
      .pipe(
        map((resulte: any) => {
          this.spiner.hide();
          return resulte;
        })
      );
  }

  public userLogin(userData: any) {
    this.spiner.show();
    return this.httpClient
      .request('post', this.baseUrl + 'login.php', { body: userData })
      .pipe(
        map((userres: any) => {
          this.spiner.hide();
          if (userres.msg == 'Success') {
            this.auth.setToken(userres?.body[0]);
            this.toastr.success(
              userres?.body[0].f_name + ' ' + userres?.body[0].l_name,
              'Welcome!'
            );
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

  public updateAgent(userData: Users, user_id: string) {
    this.spiner.show();
    return this.httpClient
      .request('put', this.baseUrl + 'agent/updateAgent.php', {
        body: userData,
        params: { _id: user_id },
      })
      .pipe(
        map((x) => {
          this.spiner.hide();
          return x;
        })
      );
  }

  public updateAmount(userData: Users, user_id: string) {
    this.spiner.show();
    return this.httpClient
      .request('put', this.baseUrl + 'agent/updateAmount.php', {
        body: userData,
        params: { _id: user_id },
      })
      .pipe(
        map((x) => {
          this.spiner.hide();
          return x;
        })
      );
  }

  public getAgentList(agentType: number, createdBy: string) {
    this.spiner.show();
    return this.httpClient
      .request(
        'get',
        this.baseUrl +
          'agent/agentList.php?agentType=' +
          agentType +
          '&createdBy=' +
          createdBy
      )
      .pipe(
        map((x: any) => {
          this.spiner.hide();
          return x;
        })
      );
  }

  public deleteAgent(user_id: number) {
    this.spiner.show();
    return this.httpClient
      .request('get', this.baseUrl + 'agent/deleteAgent.php', {
        params: { _id: user_id },
      })
      .pipe(
        map((planres: any) => {
          this.spiner.hide();
          return planres;
        })
      );
  }
}
