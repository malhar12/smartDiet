import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { FileUploadModule } from 'ng2-file-upload';
import {
  InputTextModule,
  InputTextareaModule,
  CarouselModule
  } from 'primeng/primeng';
import { DishSetupFormComponent } from './dish-setup-form/dish-setup-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    CarouselModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    CarouselModule,
    // Components
    FileUploadComponent,
    DishSetupFormComponent
  ],
  declarations: [FileUploadComponent, DishSetupFormComponent]
})
export class SharedUtilModule { }
