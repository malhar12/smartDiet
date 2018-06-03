import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilityService } from './utility.service';

@Injectable()
export class AuthService {

  constructor(private _jwtHelper: JwtHelperService, private _utilityService: UtilityService) {}

  public isAuthenticated(): boolean {
    const token = this._utilityService.getUserToken();

    return !this._jwtHelper.isTokenExpired(token);
  }
}
