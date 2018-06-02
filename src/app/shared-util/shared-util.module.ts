import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { UtilityService } from './services/utility.service';
import { TransformToSelectItemPipe } from './pipes/transformItem.pipe';

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
    SidebarModule
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
    // Components
    FileUploadComponent,
    DishSetupFormComponent,
    // Pipes
    TransformToSelectItemPipe
  ],
  declarations: [FileUploadComponent, DishSetupFormComponent, TransformToSelectItemPipe],
  providers: [MessageService]
})
export class SharedUtilModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedUtilModule,
      providers: [UtilityService]
    };
  }
}
