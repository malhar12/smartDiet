import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';

@Injectable()
export class LogoutService {
  constructor(private http: HttpClient) {}

  // Get All Starter Dishes
  logout(): Observable<any>{
    return this.http.get('./api/signout');
  }
}
