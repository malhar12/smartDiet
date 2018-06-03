import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { BuildMenuComponent } from './build-menu/build-menu.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { MenuResolver } from './menu.resolver';

import { AuthGuardService, LoginComponent } from './../shared-util';

const inventoryRoutes: Routes = [
  {
    path: 'menuInventory/:userId',
    component: BuildMenuComponent,
    canActivate: [AuthGuardService],
    resolve: { msg: MenuResolver}
  },
  {
    path: 'planner/:userId',
    component: SchedulerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(inventoryRoutes)
  ],
  exports: [RouterModule],
  providers: [MenuResolver]
})
export class InventoryRoutesModule{}
