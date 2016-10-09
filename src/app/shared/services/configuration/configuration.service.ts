
import { Injectable, Inject } from '@angular/core';

import { RESTDOCSEXT_CONFIG } from '../../../app.properties';
import { environment } from '../../../../environments/environment';

@Injectable()
export class Configuration {

  homePage: string;
  organizationLink: string;
  organizationName: string;
  pages: string[];
  baseUri: string;

  env: any = environment;

  constructor(@Inject(RESTDOCSEXT_CONFIG) config) {
    let base = JSON.parse(config);
    this.baseUri = base.baseUri;
    let conf = base.config;
    this.pages = conf.pages;
    this.organizationName = conf.organizationName;
    this.organizationLink = conf.organizationLink;
    this.homePage = conf.homePage;
  }
}
