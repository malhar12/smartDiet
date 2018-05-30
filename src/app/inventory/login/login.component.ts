import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { UtilityService } from './../../shared-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router:Router, private _loginService: LoginService, private _utility: UtilityService) { }

  ngOnInit() {
  }

  routenavigate(route: any){
    this._router.navigateByUrl(route);
  }

  onFormSubmit(value, form){
    let formData = new FormData();
    formData.append('userId', value.userId);
    formData.append('password', value.password);
    console.log(formData, 'Value Submitted');
    this._loginService.login(formData)
              .subscribe((data)=>{
                form.resetForm();
                this._utility.setUserProfile(data.payload);
                this._router.navigate(['/menuInventory', data.payload.userId], {queryParamsHandling: 'preserve', preserveFragment: true});
              }, (error)=>{
                console.log(error);
                form.resetForm();
              });
  }

}
