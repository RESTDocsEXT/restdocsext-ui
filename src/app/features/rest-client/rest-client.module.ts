import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { RestClientComponent } from './rest-client.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    RestClientComponent
  ],
  exports: [ RestClientComponent ]
})
export class RestClientModule {}
