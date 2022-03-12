import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { Trans } from 'src/models/trans';

@Injectable({
  providedIn: 'root',
})
export class TransService {
  baseUrl: string = 'http://localhost/angularCURD/trans/';
  constructor(private http: HttpClient) {}

  public getTransList() {
    return this.http.request('get', this.baseUrl + 'transList.php').pipe(
      map((x) => {
        return x;
      })
    );
  }

  public updateTrans(transData: Trans, trans_id: string) {
    return this.http
      .request('put', this.baseUrl + 'updateTrans.php', {
        body: transData,
        params: { _id: trans_id },
      })
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  public createTrans(transData: Trans) {
    console.log(transData);
    return this.http
      .request('post', this.baseUrl + 'trans_create.php', { body: transData })
      .pipe(
        map((transres: any) => {
          return transres;
        })
      );
  }

  public deleteTrans(trans_id: number) {
    return this.http
      .request('get', this.baseUrl + 'trans_delete.php', {
        params: { _id: trans_id },
      })
      .pipe(
        map((transres: any) => {
          return transres;
        })
      );
  }
}
