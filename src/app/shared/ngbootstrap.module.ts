
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap/buttons/radio.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap/tabset/tabset.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';

const NGBOOTSTRAP_MODULES = [
  NgbButtonsModule,
  NgbTabsetModule,
  NgbDropdownModule
];

@NgModule({
  imports: [
    NgbButtonsModule.forRoot(),
    NgbTabsetModule.forRoot(),
    NgbDropdownModule.forRoot()
  ],
  exports: NGBOOTSTRAP_MODULES
})
export class NgBootstrapRootModule {}

@NgModule({
  imports: NGBOOTSTRAP_MODULES,
  exports: NGBOOTSTRAP_MODULES
})
export class NgBootstrapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgBootstrapRootModule
    };
  }
}
