import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UtilityService {
  constructor() {}

  public enableStarterForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public enableMainCourseForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public user: any;

  editStarterMeta(options: boolean){
    this.enableStarterForm.next(options);
  }

  editMainCourseMeta(options: boolean){
    this.enableMainCourseForm.next(options);
  }

  setUserProfile(profile: any){
    this.user = profile;
  }

  getUserProfile(){
    return this.user;
  }

  getUserToken(){
    if(this.user){
      return this.user.token;
    }

    return null;
  }
}
