import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  // Get All Starter Dishes
  login(data): Observable<any>{
    return this.http.post('./api/signin', data);
  }
}
