import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { UtilityService } from './../services/utility.service';

import { FileUploader } from 'ng2-file-upload';
import fontawesome from '@fortawesome/fontawesome';
import FaPlus from '@fortawesome/fontawesome-free-solid';

const URL = './api/upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  uploader:FileUploader;
  @Input() type: string;
  @ViewChild('fileDropArea') public fileDropArea: ElementRef;
  @Output() public onFileSelection: EventEmitter<FileUploader> = new EventEmitter<FileUploader>();

  constructor(private _utility: UtilityService) {
    fontawesome.library.add(FaPlus);
    this.uploader = new FileUploader({
      url: URL
    });
  }

  ngOnInit() {
  }

  openConsole(){
    console.log('clicked');
  }

  fileHovered(event){
    let elem = this.fileDropArea.nativeElement;
    if(event){
      elem.classList.add('file-upload-section-hover');
    } else {
      elem.classList.remove('file-upload-section-hover');
    }
  }

  fileSelected(event){
    // TODO
    console.log(event, 'SELECTED FILE');
    this.onFileSelection.emit(this.uploader);
    this.notifyForm();
    // this.uploader.queue[0].upload();
  }

  fileOverBase(event){
    // TODO
    console.log(event, 'SELECTED FILE');
    this.onFileSelection.emit(this.uploader);
    this.notifyForm();
    // this.uploader.queue[0].upload();
  }

  notifyForm(){
    switch(this.type){
      case 'starterDish': {
        this._utility.editStarterMeta(true);
        break;
      }
      case 'mainCourse': {
        this._utility.editMainCourseMeta(true);
        break;
      }
      default: {
        break;
      }
    }
  }

}
