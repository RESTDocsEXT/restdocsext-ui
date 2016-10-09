import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RESTDOCSEXT_CONFIG } from '../index';
import { Configuration } from '../shared/services/configuration';
import { OperationsService } from '../shared/services/operations';
import { PagesService } from '../shared/services/pages';

@NgModule({
  exports: [
    HttpModule,
  ],
  declarations: [ ]
})
export class CoreModule {

  static forRoot(config: string): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        Configuration,
        OperationsService,
        PagesService,
        {
          provide: RESTDOCSEXT_CONFIG, useValue: config
        }
      ]
    };
  }
}
