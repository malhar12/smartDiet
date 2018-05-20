import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import fontawesome from '@fortawesome/fontawesome';
import FaPlus from '@fortawesome/fontawesome-free-solid';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  uploader:FileUploader;
  @ViewChild('fileDropArea') public fileDropArea: ElementRef;

  constructor() {
    fontawesome.library.add(FaPlus);
    this.uploader = new FileUploader({});
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
  }

  fileOverBase(event){
    // TODO
    console.log(event, 'SELECTED FILE');
  }

}
