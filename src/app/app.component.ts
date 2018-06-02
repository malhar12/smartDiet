import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  display: boolean = false;

  constructor(private _router: Router) {}

  routenavigate(route: string){
    this._router.navigate([route], {queryParamsHandling: 'preserve', preserveFragment: true});
  }
}
