import { NgModule } from '@angular/core';

import { RestClientComponent } from './rest-client.component';
import { RestClientRequestComponent } from './request/request.component';
import { RestClientPreviewComponent } from './preview/preview.component';
import { SharedModule } from '../../shared';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    RestClientComponent,
    RestClientRequestComponent,
    RestClientPreviewComponent
  ],
  exports: [ RestClientComponent ]
})
export class RestClientModule {}
