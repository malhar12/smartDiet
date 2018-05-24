import { Component, OnInit } from '@angular/core';

import { FileUploadComponent, UtilityService } from './../../shared-util';

@Component({
  selector: 'app-build-menu',
  templateUrl: './build-menu.component.html',
  styleUrls: ['./build-menu.component.css']
})
export class BuildMenuComponent implements OnInit {

  uploader: any;
  constructor(private _utility: UtilityService) { }

  ngOnInit() {
  }

  selectedImage($event){
    // TODO
    this.uploader = $event;
    console.log($event, 'FILE UPLOADED');
  }

  submitDish($event){
    console.log($event, 'UPLOAD META');
    let formData = $event;
    let file = this.uploader.queue[0].file;
    formData.imgLocation = this.formatFileName(file);

    this.uploader.onBuildItemForm = (fileItem, form) => {
      form.append('data', JSON.stringify(formData));
      return {fileItem, form};
    };

    this.uploader.queue[0].upload();

    this.uploader.onSuccessItem = (fileItem, response, status, headers) => {
      console.log('File Uploaded successfully');

      if(formData.type === 'starterDish'){
        this._utility.editStarterMeta(false);
      } else if(formData.type === 'mainCourse'){
        this._utility.editMainCourseMeta(false);
      }
    };

    this.uploader.onErrorItem = (fileItem, response, status, headers) => {
      console.log('File NOT Uploaded successfully');
    };
  }

  formatFileName(file){
    let fileName = file.name;

    let fileNameSplit = fileName.split('.');

    return './file_.' + fileNameSplit[1];
  }

}
