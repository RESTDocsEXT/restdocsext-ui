
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IterablePipe } from './pipes';
import { AceEditorDirective } from './directives';

import { AccordionModule } from './components/accordion';
import { MaterialModule } from './material.module';
import { NgBootstrapModule } from './ngbootstrap.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,

    IterablePipe,
    AceEditorDirective,

    AccordionModule,
    MaterialModule,
    NgBootstrapModule
  ],
  declarations: [ IterablePipe, AceEditorDirective ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}