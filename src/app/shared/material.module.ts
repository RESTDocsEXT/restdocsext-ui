import { NgModule, ModuleWithProviders } from '@angular/core';

import { MdSidenavModule } from '@angular/material/sidenav';
import { MdToolbarModule } from '@angular/material/toolbar';
import { MdIconModule } from '@angular/material/icon';

const MATERIAL_MODULES = [
  MdSidenavModule,
  MdToolbarModule,
  MdIconModule
];

@NgModule({
  imports: [
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdIconModule.forRoot()
  ],
  exports: MATERIAL_MODULES
})
export class MaterialRootModule {}

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialRootModule
    };
  }
}
