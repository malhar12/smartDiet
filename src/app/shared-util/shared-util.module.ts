import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { UtilityService } from './services/utility.service';
import { TokenInterceptor } from './services/token.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth.guard';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { TransformToSelectItemPipe } from './pipes/transformItem.pipe';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { LogoutService } from './login/logout.service';
import { NavbarComponent } from './navbar/navbar.component';

import { FileUploadModule } from 'ng2-file-upload';
import {
  InputTextModule,
  InputTextareaModule,
  GrowlModule,
  DataListModule,
  ProgressSpinnerModule,
  ScheduleModule,
  DialogModule,
  ButtonModule,
  DropdownModule,
  SidebarModule
  } from 'primeng/primeng';
// import { CarouselModule } from 'primeng/carousel';
// import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { DishSetupFormComponent } from './dish-setup-form/dish-setup-form.component';

export function tokenGetter(){
  return localStorage.getItem('auth_token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    DataListModule,
    GrowlModule,
    ProgressSpinnerModule,
    ScheduleModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    SidebarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    DataListModule,
    GrowlModule,
    ProgressSpinnerModule,
    ScheduleModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    SidebarModule,
    JwtModule,
    // Components
    FileUploadComponent,
    DishSetupFormComponent,
    NavbarComponent,
    LoginComponent,
    // Pipes
    TransformToSelectItemPipe
  ],
  declarations: [FileUploadComponent, DishSetupFormComponent, TransformToSelectItemPipe, LoginComponent, NavbarComponent],
  providers: [
    MessageService,
    AuthGuardService,
    AuthService,
    JwtHelperService, LoginService,
    LogoutService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})
export class SharedUtilModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedUtilModule,
      providers: [UtilityService]
    };
  }
}
