import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { createAppModule } from './app/';
import { StandaloneHttp } from './app/shared/http';
import 'rxjs/add/operator/first';

StandaloneHttp.newInstance().get(environment.jsonConfigUrl)
  .first()
  .map(res => res.text())
  .subscribe(
    initializeApp,
    handleError);

function initializeApp(config) {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(createAppModule(config));
}

function handleError(error) {
  console.log(error);
}

