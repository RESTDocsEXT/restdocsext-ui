import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

import { Operation } from '../../shared/models';
import { isPresent } from '../../shared/util';
import { OperationsService } from '../../shared/services/operations';
import { Configuration } from '../../shared/services/configuration';

export class MenuSelectionEvent {
  constructor(public value: string | Operation) {}

  isOperationSelection(): boolean {
    return isPresent(this.value['id']);
  }
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent {

  @Output() itemSelected = new EventEmitter<MenuSelectionEvent>();

  homePage: string;
  operations: Map<string, Operation[]>;
  organizationLink: string;
  organizationName: string;
  pages: string[];

  constructor(private config: Configuration,
              private operationsService: OperationsService) {
    this.homePage = config.homePage;
    this.pages = config.pages;
    this.organizationName = config.organizationName;
    this.organizationLink = config.organizationLink;
    this.operations = operationsService.operations;
  }

  onItemSelected(item: string | Operation) {
    this.itemSelected.emit(new MenuSelectionEvent(item));
  }

  getBadgeStyle(httpMethod) {
    return `${httpMethod.toLowerCase()}-badge`;
  }
}
