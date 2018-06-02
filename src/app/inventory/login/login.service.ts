import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  // Get All Starter Dishes
  login(data): Observable<any>{
    return this.http.post('./api/signin', data)
                    .catch((error: any) => Observable.throw(error || 'Internal Server Error - 500'));
  }
}
