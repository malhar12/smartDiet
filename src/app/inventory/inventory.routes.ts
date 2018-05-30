import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BuildMenuComponent } from './build-menu/build-menu.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { LoginComponent } from './login/login.component';
import { MenuResolver } from './menu.resolver';

const inventoryRoutes: Routes = [
  {
    path: 'menuInventory/:userId',
    component: BuildMenuComponent,
    resolve: { msg: MenuResolver}
  },
  {
    path: 'planner/:userId',
    component: SchedulerComponent
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
