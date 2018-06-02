import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FileUploadComponent,
  UtilityService,
  DishProfile
} from './../../shared-util';
import { FileUploader } from 'ng2-file-upload';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenuService } from './build-menu.service';

@Component({
  selector: 'app-build-menu',
  templateUrl: './build-menu.component.html',
  styleUrls: ['./build-menu.component.css'],
  providers: [ MessageService ]
})
export class BuildMenuComponent implements OnInit {

  uploader: FileUploader;
  msgs: Message[] = [];
  user: any;

  starterDishes: DishProfile[] = [];
  mainCourseDishes: DishProfile[] = [];
  constructor(private _utility: UtilityService,
              private _messageService: MessageService,
              private _route: ActivatedRoute,
              private _menuService: MenuService,
              private _router:Router) { }

  ngOnInit() {
    let initialLoad = this._route.snapshot.data.msg;
    this.starterDishes = initialLoad[0].payload;
    this.mainCourseDishes = initialLoad[1].payload;

    this.user = this._utility.getUserProfile();
  }

  selectedImage($event){
    // TODO
    this.uploader = $event;
    this._messageService.add({
      severity: 'info',
      summary: 'File selected for upload',
      detail: this.uploader.queue[0].file.name
    });
    console.log($event, 'FILE UPLOADED');
  }

  selectionEvent(event){
    console.log(event, 'SOMETHINF Happened');
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

      this._messageService.clear();
      this._messageService.add({
        severity: 'success',
        summary: 'Dish Added to Menu',
        detail: this.uploader.queue[0].file.name
      });

      if(formData.type === 'starterDish'){
        this._utility.editStarterMeta(false);
        this._menuService.getAllStarterDishes().subscribe((data)=>{
          this.starterDishes = data.payload;
        });
      } else if(formData.type === 'mainCourse'){
        this._utility.editMainCourseMeta(false);
        this._menuService.getAllMainCourseDishes().subscribe((data)=>{
          this.mainCourseDishes = data.payload;
        });
      }
      this.uploader.queue.length = 0;
      setTimeout(()=>{
        this._messageService.clear();
      },5);
    };

    this.uploader.onErrorItem = (fileItem, response, status, headers) => {
      console.log('File NOT Uploaded successfully');

      this._messageService.clear();
      this._messageService.add({
        severity: 'success',
        summary: 'Dish Added to Menu',
        detail: this.uploader.queue[0].file.name
      });

      setTimeout(()=>{
        this._messageService.clear();
      },5);
    };
  }

  formatFileName(file){
    let fileName = file.name;

    let fileNameSplit = fileName.split('.');

    return './file_.' + fileNameSplit[1];
  }

  routenavigate(route: string){
    this._router.navigate([route], {queryParamsHandling: 'preserve', preserveFragment: true});
  }

}
