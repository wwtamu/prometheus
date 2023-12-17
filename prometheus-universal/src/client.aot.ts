// the polyfills must be the first thing imported
import 'angular2-universal-polyfills';
import 'ts-helpers';
// temporary until 2.1.1 things are patched in Core
import './platform/workarounds/__workaround.browser';

// Angular 2
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { bootloader } from '@angularclass/bootloader';

// enable prod for faster renders
enableProdMode();

import { MainModuleNgFactory } from './platform/modules/browser.module.ngfactory';

export const platformRef = platformBrowser();

// on document ready bootstrap Angular 2
export function main() {
  return platformRef.bootstrapModuleFactory(MainModuleNgFactory);
}

// support async tag or hmr
bootloader(main);
