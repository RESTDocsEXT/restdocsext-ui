import { NgModule } from '@angular/core';

import { SideMenuComponent } from './side-menu.component';
import { SharedModule } from '../../shared';


@NgModule({
  imports: [ SharedModule ],
  declarations: [ SideMenuComponent ],
  exports: [ SideMenuComponent ]
})
export class SideMenuModule {

}
