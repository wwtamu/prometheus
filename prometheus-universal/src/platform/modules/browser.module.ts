import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UniversalModule, isBrowser, isNode, AUTO_PREBOOT } from 'angular2-universal/browser';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GLOBAL_CONFIG, DEFAULT_GLOBAL_CONFIG } from '../../config';

import { AppComponent, AppModule } from '../../app/app.module';
import { BrowserStorage } from '../storage.browser';
import { BrowserCookie } from '../cookie.browser';
import { CacheService } from '../../app/core/cache.service';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

export function getLRU(lru?: any) {
  // use LRU for node
  // return lru || new LRU(10);
  return lru || new Map();
}

export function getRequest() {
  // the request object only lives on the server
  return { cookie: document.cookie };
}

export function getResponse() {
  // the response object is sent as the index.html and lives on the server
  return {};
}

export function cookies() {
  return new BrowserCookie();
}

export function storage() {
  return new BrowserStorage();
}

// TODO: update when refactored into Universal
export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot([], {
      useHash: false,
      preloadingStrategy: IdlePreload
    }),
    IdlePreloadModule.forRoot(),
    // UniversalModulemust come after TranslateModule
    // https://github.com/angular/universal/issues/536#issuecomment-247762794
    // BrowserModule, HttpModule, and JsonpModule are included in UniversalModule
    UniversalModule,
    AppModule
  ],
  providers: [
    { provide: GLOBAL_CONFIG, useValue: DEFAULT_GLOBAL_CONFIG },
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    { provide: 'req', useFactory: getRequest },
    { provide: 'res', useFactory: getResponse },
    { provide: 'LRU', useFactory: getLRU, deps: [] },
    { provide: 'Cookies', useFactory: cookies },
    { provide: 'Storage', useFactory: storage },
    CacheService
  ]
})
export class MainModule {

  constructor(public cache: CacheService) {
    // TODO: remove when refactored into a lifecycle hook
    this.doRehydrate();
  }

  doRehydrate() {
    this.cache.rehydrate(this._getCacheValue(CacheService.KEY, {}));
  }

  _getCacheValue(key: string, defaultValue: any): any {
    // browser
    const win: any = window;
    if (win[UNIVERSAL_KEY] && win[UNIVERSAL_KEY][key]) {
      let serverCache = defaultValue;
      try {
        serverCache = JSON.parse(win[UNIVERSAL_KEY][key]);
        if (typeof serverCache !== typeof defaultValue) {
          console.log('Angular Universal: The type of data from the server is different from the default value type');
          serverCache = defaultValue;
        }
      } catch (e) {
        console.log('Angular Universal: There was a problem parsing the server data during rehydrate');
        serverCache = defaultValue;
      }
      return serverCache;
    } else {
      console.log('Angular Universal: UNIVERSAL_CACHE is missing');
    }
    return defaultValue;
  }

}
