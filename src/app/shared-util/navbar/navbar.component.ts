import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { UtilityService } from './../services/utility.service';
import { LogoutService } from './../login/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Input() menuVal: boolean;
  menuValue: boolean;
  user:any = {
    isAdmin : false
  };
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _utility: UtilityService, private _router: Router, private _logout: LogoutService) { }

  ngOnInit() {
    this.user = this._utility.getUserProfile();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['menuVal']){
      this.menuValue = changes['menuVal'].currentValue;
    }
  }

  routenavigate(route: string){
    this._router.navigate([route, this.user.userId], {queryParamsHandling: 'preserve', preserveFragment: true});
  }

  logout(){
    this._logout.logout()
                .subscribe(()=>{
                  localStorage.removeItem('auth_token');
                  console.log('Logged Out of the System');
                  this._router.navigate(['/login']);
                });
  }

}
