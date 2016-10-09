import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core';

// TODO: remove for production
import { restdocsextConfJson } from './testing';
import { MockHttpDataModule } from './shared/mock-data';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(restdocsextConfJson),

    // TODO: remove for production
    MockHttpDataModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
