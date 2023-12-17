import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node';

import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';

import { TranslateUniversalLoader } from '../loaders/translate-universal.loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GLOBAL_CONFIG, DEFAULT_GLOBAL_CONFIG } from '../../config';

import { AppComponent, AppModule } from '../../app/app.module';
import { NodeCookie } from '../cookie.node';
import { NodeStorage } from '../storage.node';
import { CacheService } from '../../app/core/cache.service';

export function createTranslateLoader() {
  return new TranslateUniversalLoader('dist/server/assets/i18n', '.json');
}

export function getLRU() {
  return new Map();
}

export function getRequest() {
  return Zone.current.get('req') || {};
}

export function getResponse() {
  return Zone.current.get('res') || {};
}

export function cookies() {
  return new NodeCookie();
}

export function storage() {
  return new NodeStorage();
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
      useHash: false
    }),
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

  }

  /**
   * We need to use the arrow function here to bind the context as this is a gotcha
   * in Universal for now until it's fixed
   */
  universalDoDehydrate = (universalCache) => {
    universalCache[CacheService.KEY] = JSON.stringify(this.cache.dehydrate());
  }

  /**
   * Clear the cache after it's rendered
   */
  universalAfterDehydrate = () => {
    // comment out if LRU provided at platform level to be shared between each user
    this.cache.clear();
  }

}
