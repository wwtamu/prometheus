// the polyfills must be the first thing imported
import 'angular2-universal-polyfills';
import 'ts-helpers';
// temporary until 2.1.1 things are patched in Core
import './platform/workarounds/__workaround.browser';

// Angular 2
import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal/browser';
import { bootloader } from '@angularclass/bootloader';

// throws Exception without
// Expression has changed after it was checked. Previous value: 'false'. Current value: 'true'.
// When a form populates values from a subscription, the second check values are different then the first
enableProdMode();

import { MainModule } from './platform/modules/browser.module';

export const platformRef = platformUniversalDynamic();

// on document ready bootstrap Angular 2
export function main() {
  return platformRef.bootstrapModule(MainModule);
}

// support async tag or hmr
bootloader(main);
