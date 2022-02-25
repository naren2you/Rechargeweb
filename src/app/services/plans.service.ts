import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { Plan } from 'src/models/plans';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  baseUrl: string = 'http://localhost/angularCURD/plans/';
  constructor(private http: HttpClient) {}

  getPlanList() {
    console.log('i am in get plan list funciton');
    return this.http.request('get', this.baseUrl + 'plan_read.php').pipe(
      map((x) => {
        console.log(x);
        return x;
      })
    );
  }
}
