
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Collapse } from '../../animations';
import { AccordionItem } from './accordion-item';

@Component({
  selector: 'app-accordion',
  template: '<ng-content></ng-content>',
  animations: [ Collapse(350) ],
  encapsulation: ViewEncapsulation.None
})
export class Accordion {

  @Input() closeOthers: boolean = true;
  @Input() duration: number = 250;

  private items: Array<AccordionItem> = [];

  closeOtherItems(openItem: AccordionItem) {
    if (!this.closeOthers) { return; }

    this.items.forEach((item: AccordionItem) => {
      if (item !== openItem) {
        item.open = false;
        item.openChange.next(item.open);
      }
    });
  }

  addItem(item: AccordionItem) {
    this.items.push(item);
  }

  removeItem(item: AccordionItem) {
    let index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
