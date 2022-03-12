import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Plan } from 'src/models/plans';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  baseUrl: string = 'http://localhost/angularCURD/plans/';
  constructor(private http: HttpClient, private spiner: NgxSpinnerService) {}

  public getPlanList() {
    this.spiner.show();
    return this.http.request('get', this.baseUrl + 'plan_read.php').pipe(
      map((x) => {
        this.spiner.hide();
        return x;
      })
    );
  }

  public updatePlan(planData: Plan, plan_id: string) {
    this.spiner.show();
    return this.http
      .request('put', this.baseUrl + 'plan_update.php', {
        body: planData,
        params: { _id: plan_id },
      })
      .pipe(
        map((x) => {
          this.spiner.hide();
          return x;
        })
      );
  }

  public createPlan(planData: Plan) {
    this.spiner.show();
    return this.http
      .request('post', this.baseUrl + 'plan_create.php', { body: planData })
      .pipe(
        map((planres: any) => {
          this.spiner.hide();
          return planres;
        })
      );
  }

  public deletePlan(plan_id: number) {
    this.spiner.show();
    return this.http
      .request('get', this.baseUrl + 'plan_delete.php', {
        params: { _id: plan_id },
      })
      .pipe(
        map((planres: any) => {
          this.spiner.hide();
          return planres;
        })
      );
  }
}
