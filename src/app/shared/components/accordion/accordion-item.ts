import { Component, OnInit, OnDestroy, Input,
         Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Collapse } from '../../animations';
import { Accordion } from './accordion';

@Component({
  selector: `app-accordion-item`,
  templateUrl: './accordion-item.html',
  animations: [ Collapse(350) ],
  encapsulation: ViewEncapsulation.None
})
export class AccordionItem implements OnInit, OnDestroy {

  @Input() heading: string;
  @Input() disabled: boolean = false;

  @Output() openChange = new EventEmitter();

  private _open: boolean = false;

  @Input() get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    if (value) {
      this.accordion.closeOtherItems(this);
    }
  }

  constructor(private accordion: Accordion) {}

  ngOnInit() {
    this.accordion.addItem(this);
  }

  ngOnDestroy() {
    this.accordion.removeItem(this);
  }

  toggleOpen(event: MouseEvent) {
    event.preventDefault();
    if (!this.disabled) {
      this.open = !this.open;
      this.openChange.next(this.open);
    }
  }
}
