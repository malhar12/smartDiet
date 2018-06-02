import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BuildMenuComponent } from './inventory';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: './inventory/inventory.module#InventoryModule'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
