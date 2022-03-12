import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Trans } from 'src/models/trans';

@Injectable({
  providedIn: 'root',
})
export class TransService {
  baseUrl: string = 'http://localhost/angularCURD/trans/';
  constructor(private http: HttpClient, private spiner: NgxSpinnerService) {}

  public getTransList() {
    this.spiner.show();
    return this.http.request('get', this.baseUrl + 'transList.php').pipe(
      map((x) => {
        this.spiner.hide();
        return x;
      })
    );
  }

  public updateTrans(transData: Trans, trans_id: string) {
    this.spiner.show();
    return this.http
      .request('put', this.baseUrl + 'updateTrans.php', {
        body: transData,
        params: { _id: trans_id },
      })
      .pipe(
        map((x) => {
          this.spiner.hide();
          return x;
        })
      );
  }

  public createTrans(transData: Trans) {
    this.spiner.show();
    return this.http
      .request('post', this.baseUrl + 'trans_create.php', { body: transData })
      .pipe(
        map((transres: any) => {
          this.spiner.hide();
          return transres;
        })
      );
  }

  public deleteTrans(trans_id: number) {
    this.spiner.show();
    return this.http
      .request('get', this.baseUrl + 'trans_delete.php', {
        params: { _id: trans_id },
      })
      .pipe(
        map((transres: any) => {
          this.spiner.hide();
          return transres;
        })
      );
  }
}
