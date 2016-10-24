import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AppHttpModule } from './shared/http';
import { appRoutes } from './app.routing';

import { environment } from '../environments/environment';

export function createAppModule(config: string) {

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,

      SharedModule.forRoot(),
      CoreModule.forRoot(config),
      RouterModule.forRoot(appRoutes(config)),
      AppHttpModule.forRoot(environment),
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  class AppModule { }

  return AppModule;
}

