import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { MainContentComponent } from './main-content.component';
import { DocumentationModule } from '../../features/documentation';
import { RestClientModule } from '../../features/rest-client';

@NgModule({
  imports: [
    SharedModule,
    DocumentationModule,
    RestClientModule
  ],
  declarations: [ MainContentComponent ],
  exports: [ MainContentComponent ]
})
export class MainContentModule {}
