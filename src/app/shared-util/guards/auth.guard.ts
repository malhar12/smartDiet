import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): boolean {

    if (!this._authService.isAuthenticated()) {
      this._router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
