import { Component, OnInit } from '@angular/core';
import { SchedulerService } from './scheduler.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import { Router } from '@angular/router';

import { UtilityService } from './../../shared-util';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  events: any[] = [];
  headerConfig: any;
  display: boolean = false;
  scheduleId: string;
  date: any;

  selectedStarterDish: any;
  selectedMainCourseDish: any;

  starterDishes: any[] = [];
  mainCourseDishes: any[] = [];
  user: any;
  cards: any[] = [];

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(private _schedulerService: SchedulerService,
              private _router:Router,
              private _utility: UtilityService) { }

  ngOnInit() {
    this.headerConfig = {
			left: 'prev,next today',
			center: 'title',
			right: 'month'
		};

    this.user = this._utility.getUserProfile();

    this._schedulerService.getUpdatedScore(this.user.userId).subscribe(resultset=>{
      this.events = resultset[0].payload;
      resultset[1].payload.forEach((card)=>{
        let date = new Date(card.selection[0].date);
        card['year'] = date.getFullYear();

        let sum = 0;
        card.selection.forEach((select)=>{
          sum += select.dishId1.price + select.dishId2.price;
        });

        card['total'] = sum;
      });

      this.cards = resultset[1].payload;
    });
  }

  daySelection(event){
    console.log(event, 'SELECTION');
    this.scheduleId = event.date.isoWeek();
    this.date = event.date;
    this._schedulerService.getFilteredDishes(this.scheduleId).subscribe(data=>{
      this.starterDishes = data[0].payload;
      this.mainCourseDishes = data[1].payload;
    });
    this.display = true;
  }

  onFormSubmit(event, plannerForm: any){
    console.log(event, 'Planner selection made');
    let starterDiet = event.starterDish.split(',');
    let mainCourseDiet = event.mainCourseDish.split(',');
    let date = this.date.toDate();
    // ********** //
    let eventData = new FormData();
    eventData.append('userId', this.user.userId);
    eventData.append('allDay', 'true');
    eventData.append('start', this.date);
    eventData.append('end', this.date);
    eventData.append('editable', 'false');
    eventData.append('title', starterDiet[0] + '\n' + mainCourseDiet[0]);
    eventData.append('textColor', '#fff');
    // ********** //
    // ********** //
    let formData = new FormData();
    formData.append('scheduleId', this.scheduleId);
    formData.append('month', date.getMonth());
    formData.append('userId', this.user.userId);
    formData.append('date', date);
    formData.append('dishId1', starterDiet[1]);
    formData.append('dishId2', mainCourseDiet[1]);
    // ********** //
    this._schedulerService.createSchedule(formData)
      .do(data=>{
        plannerForm.resetForm();
        this.display = false;
        console.log(data);
      })
      .flatMap(()=>this._schedulerService.createEvent(eventData))
      .flatMap(()=>this._schedulerService.getUpdatedScore(this.user.userId))
      .subscribe(resultset=>{
        // this.events.push(data.body);
        this.events = resultset[0].payload;


        resultset[1].payload.forEach((card)=>{
          let date = new Date(card.selection[0].date);
          card['year'] = date.getFullYear();
          console.log(card);
        });

        this.cards = resultset[1].payload;
      });
  }

  routenavigate(route: string){
    this._router.navigate([route], {queryParamsHandling: 'preserve', preserveFragment: true});
  }

}
