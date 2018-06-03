import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { InventoryRoutesModule } from './inventory.routes';
import { BuildMenuComponent } from './build-menu/build-menu.component';
import { MenuService } from './build-menu/build-menu.service';

import { SharedUtilModule } from './../shared-util';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { SchedulerService } from './scheduler/scheduler.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    InventoryRoutesModule,
    SharedUtilModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    InventoryRoutesModule,
    BuildMenuComponent,
    SchedulerComponent
  ],
  declarations: [BuildMenuComponent, SchedulerComponent],
  providers: [MenuService, SchedulerService]
})
export class InventoryModule { }
