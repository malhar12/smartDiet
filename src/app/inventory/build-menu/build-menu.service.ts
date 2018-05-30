import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DishProfile } from './../../shared-util';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class MenuService {
  constructor(private http: HttpClient) {}

  // Get All Starter Dishes
  getAllStarterDishes(): Observable<any>{
    return this.http.get('./api/getAllStarterDishes')
                    .catch((error: any) => Observable.throw(error || 'Internal Server Error - 500'));
  }

  // Get All MainCourse Dishes
  getAllMainCourseDishes(): Observable<any>{
    return this.http.get('./api/getAllMainCourseDishes')
                    .catch((error: any) => Observable.throw(error || 'Internal Server Error - 500'));
  }

  // Get All Dishes
  getAllDishes(): Observable<any>{
    let starterDishes = this.http.get('./api/getAllStarterDishes');
    let mainCourseDishes = this.http.get('./api/getAllMainCourseDishes');

    return Observable.forkJoin([starterDishes, mainCourseDishes]);
  }
}
