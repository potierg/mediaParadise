import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class ScraperService {

  constructor(private http: Http) { }

  scrappSite() : Observable<any> {

    return this.http.get("");
  }
}
