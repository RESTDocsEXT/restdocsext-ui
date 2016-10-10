import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { appRoutes } from './app.routing';

// TODO: remove for production
import { restdocsextConfJson } from './testing';
import { MockHttpDataModule } from './shared/mock-data';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes(restdocsextConfJson)),

    CoreModule.forRoot(restdocsextConfJson),
    SharedModule.forRoot(),

    // TODO: remove for production
    MockHttpDataModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
