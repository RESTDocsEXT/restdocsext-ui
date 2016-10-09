
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Configuration } from '../configuration';

@Injectable()
export class PagesService {

  private baseUrl;
  private _currentPage = new ReplaySubject<string>(1);

  constructor(private http: Http, private config: Configuration) {
    this.baseUrl = config.env.baseDocsPath;
  }

  set currentPage(path: string) {
    this.http.get(`${this.baseUrl + path}.html`)
      .map(res => res.text())
      .toPromise()
      .then(content => {
        this._currentPage.next(content);
      })
      .catch(error => {
        this._currentPage.next(`Error processing page: ${error.message}`);
      });
  }

  get currentPage$(): Observable<string> {
    return this._currentPage.asObservable();
  }
}
