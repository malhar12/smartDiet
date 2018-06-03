import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { UtilityService } from './utility.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _utilityService: UtilityService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let token = this._utilityService.getUserToken();

    if(token){
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request);
  }
}
