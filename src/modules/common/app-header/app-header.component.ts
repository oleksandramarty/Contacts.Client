import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent{
  constructor(
      private router: Router
  ) {
  }

  goto(url: string): void {
    this.router.navigate([url]);
  }
}
