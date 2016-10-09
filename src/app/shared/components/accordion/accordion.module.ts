import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ Accordion, AccordionItem ],
  exports: [ Accordion, AccordionItem ]
})
export class AccordionModule {}