import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RESTDOCSEXT_CONFIG } from '../app.properties';
import { Configuration } from '../shared/services/configuration';
import { OperationsService } from '../shared/services/operations';
import { PagesService } from '../shared/services/pages';
import { SideMenuModule } from '../layout/side-menu';
import { MainContentModule } from '../layout/main-content';

import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    HttpModule,
    MaterialModule.forRoot()
  ],
  exports: [
    SideMenuModule,
    MainContentModule
  ],
  declarations: [ ]
})
export class CoreModule {

  static forRoot(config: string): ModuleWithProviders {
    console.log(`RESTDOCSEXT_CONFIG: ${RESTDOCSEXT_CONFIG}`);
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: RESTDOCSEXT_CONFIG, useValue: config
        },
        Configuration,
        OperationsService,
        PagesService,
      ]
    };
  }
}
