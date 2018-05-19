import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

import { InventoryModule } from './inventory';
// import { SharedUtilModule } from './shared-util';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InventoryModule
    // SharedUtilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
