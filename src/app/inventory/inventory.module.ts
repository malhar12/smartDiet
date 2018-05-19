import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildMenuComponent } from './build-menu/build-menu.component';

import { SharedUtilModule } from './../shared-util';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilModule
  ],
  exports: [BuildMenuComponent],
  declarations: [BuildMenuComponent]
})
export class InventoryModule { }
