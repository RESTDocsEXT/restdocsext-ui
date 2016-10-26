import { NgModule } from '@angular/core';

import { RestClientComponent } from './rest-client.component';
import { RestClientRequestComponent } from './request/request.component';
import { SharedModule } from '../../shared';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    RestClientComponent,
    RestClientRequestComponent
  ],
  exports: [ RestClientComponent ]
})
export class RestClientModule {}
