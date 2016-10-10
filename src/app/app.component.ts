import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuSelectionEvent } from './layout/side-menu';
import { GENERAL_ROOT_PATH, OPERATIONS_ROOT_PATH } from './app.properties';
import { makeUrlFriendly } from './shared/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private router: Router) {}

  onItemSelected(event: MenuSelectionEvent) {
    this.router.navigate(this.getRoute(event));
    console.log(event);
  }

  getRoute(event: MenuSelectionEvent): Array<string> {
    if (event.isOperationSelection()) {
      return [`/${OPERATIONS_ROOT_PATH}`, makeUrlFriendly(event.value['name'])];
    } else {
      return [`/${GENERAL_ROOT_PATH}`, makeUrlFriendly(<string>event.value)];
    }
  }
}
