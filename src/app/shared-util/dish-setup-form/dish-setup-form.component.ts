import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DishProfile } from './../model/dishProfile';

import { UtilityService } from './../services/utility.service';

@Component({
  selector: 'app-dish-setup-form',
  templateUrl: './dish-setup-form.component.html',
  styleUrls: ['./dish-setup-form.component.css']
})
export class DishSetupFormComponent implements OnInit, OnDestroy {

  enableForm: boolean = false;
  @Input() type: string;
  @Output() public dishPayload: EventEmitter<DishProfile> = new EventEmitter<DishProfile>();

  constructor(private _utility: UtilityService) { }

  ngOnInit() {
    if(this.type === 'starterDish'){
      this._utility.enableStarterForm.subscribe((value)=> {
        this.enableForm = value;
      });
    } else if(this.type === 'mainCourse'){
      this._utility.enableMainCourseForm.subscribe((value)=> {
        this.enableForm = value;
      });
    }
  }

  onFormSubmit(formValue, dishForm: any){
    this.dishPayload.emit({
      _id: '',
      userId: '001',
      dishId: 'Dish_',
      name: formValue.name,
      price: formValue.price,
      description: formValue.description,
      type: this.type,
      imgLocation: '',
      created_at: new Date(),
      updated_at: new Date()
    });

    dishForm.resetForm();
  }

  ngOnDestroy(){
    if(this.type === 'starterDish'){
      this._utility.enableStarterForm.unsubscribe();
    } else if(this.type === 'mainCourse'){
      this._utility.enableMainCourseForm.unsubscribe();
    }
  }

}
