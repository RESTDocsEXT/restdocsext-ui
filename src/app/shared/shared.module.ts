
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IterablePipe } from './pipes';

import { AccordionModule } from './components/accordion';

import { MaterialModule } from './material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,

    IterablePipe,

    AccordionModule,

    MaterialModule
  ],
  declarations: [ IterablePipe ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}