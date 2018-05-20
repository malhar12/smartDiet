import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildMenuComponent } from './inventory';

const routes: Routes = [
  {
    path: '',
    component: BuildMenuComponent
  },
  {
    path: '**',
    component: BuildMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
