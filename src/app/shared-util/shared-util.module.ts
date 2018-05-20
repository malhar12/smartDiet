import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports: [
    CommonModule,
    FileUploadModule,
    // Components
    FileUploadComponent
  ],
  declarations: [FileUploadComponent]
})
export class SharedUtilModule { }
