import { Component, OnInit } from '@angular/core';

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

  constructor() {
    fontawesome.library.add(FaPlus);
    this.uploader = new FileUploader({});
  }

  ngOnInit() {
  }

  openConsole(){
    console.log('clicked');
  }

  fileSelected(event){
    console.log(event, 'SELECTED FILE');
  }

  fileOverBase(event){
    console.log(event, 'SELECTED FILE');
  }

}
