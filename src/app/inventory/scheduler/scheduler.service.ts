import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class SchedulerService {
  constructor(private http: HttpClient) {}

  // Get All Dishes
  getFilteredDishes(scheduleId: string): Observable<any>{
    let filteredStarterDishes = this.http.get('./api/getStarterDishes?scheduleId=' + scheduleId);
    let filteredMainCourseDishes = this.http.get('./api/getMainCourseDishes?scheduleId=' + scheduleId);

    return Observable.forkJoin([filteredStarterDishes, filteredMainCourseDishes]);
  }

  // Get All Events
  getAllEvents(userId: string): Observable<any>{
    return this.http.get('./api/getAllEvents?userId=' + userId);
  }

  createSchedule(data): Observable<any>{
    return this.http.post('./api/updateSchedule', data);
  }

  createEvent(data): Observable<any>{
    return this.http.post('./api/updateEvent', data);
  }

  getUpdatedScore(userId: string): Observable<any>{
    let eventsData = this.http.get('./api/getAllEvents?userId=' + userId);
    let scoreData = this.http.get('./api/getAllSchedules?userId=' + userId);

    return Observable.forkJoin([eventsData, scoreData]);
  }
}
