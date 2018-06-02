import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DishProfile } from './../shared-util';
import { MenuService } from './build-menu/build-menu.service';

@Injectable()
export class MenuResolver implements Resolve<Observable<any>>{
  constructor(private _menuService: MenuService){}

  resolve(){
    return this._menuService.getAllDishes();
  }
}
