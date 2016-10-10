import { Routes } from '@angular/router';

import { MainContentComponent } from './layout/main-content/main-content.component';
import { makeUrlFriendly } from './shared/util';
import { GENERAL_ROOT_PATH, OPERATIONS_ROOT_PATH } from './app.properties';

function createRoutes(homePage, isGeneral): Routes {
  const redirect = `/${isGeneral ? GENERAL_ROOT_PATH : OPERATIONS_ROOT_PATH}/${homePage}`;
  return [
    { path: '', redirectTo: redirect, pathMatch: 'full' },
    {
      path: ':type/:name', component: MainContentComponent
    }
  ];
}

// Keep comment for example of lazy loading with `System.import`
//  {
//    path: 'detail', loadChildren: () => System.import('./+detail')
//  },

/**
 * Get routes configured with a redirect route for home page.
 * The home page will be determined by the configuration.
 * 
 * If no `homePage` property is specificed in the config,
 * The first page from `pages` will be used`. If there are
 * no `pages`, then the first api operation will be selected.
 * Otherwise an error will be thrown.
 */
export function appRoutes(config: string) {
  const conf = JSON.parse(config).config;
  const pages = conf.pages;
  const collections = conf.collections;

  let homePage = conf.homePage;
  let isGeneral: boolean;
  if (!homePage) {
    if (isNonEmptyArray(pages)) {
      homePage = pages[0];
      isGeneral = true;
    } else if (isNonEmptyArray(collections)) {
      homePage = collections[0].name;
      isGeneral = false;
    } else {
      throw new Error(`No Pages or Collections to make home page: 
                       Pages: ${pages}, Collections: ${collections}`);
    }
  } else {
    if (isGeneralPage(conf.pages, homePage)) {
      isGeneral = true;
    } else {
      isGeneral = false;
    }
  }
  homePage = makeUrlFriendly(homePage);

  return createRoutes(homePage, isGeneral);
}

function isGeneralPage(pages, page) {
  if (isNonEmptyArray(pages)) {
    return pages.indexOf(page) !== -1;
  }
  return false;
}

function isNonEmptyArray(arr): boolean {
  return arr && arr instanceof Array && arr.length > 0;
}
