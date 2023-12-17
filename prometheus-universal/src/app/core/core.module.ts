import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from 'ng2-translate/ng2-translate';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContextProvider } from '../context/context.provider';
import { NotificationService } from '../notification/notification.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { StorageService } from './storage.service';
import { CookieService } from './cookie.service';
import { FormService } from '../form/form.service';
import { RestService } from './rest.service';

const MODULES = [
  // Do NOT include UniversalModule, HttpModule, or JsonpModule here
  CommonModule,
  RouterModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  NgbModule
];

const COMPONENTS = [
  // put core components here
];

const PROVIDERS = [
  // put core providers here
  ContextProvider,
  NotificationService,
  CookieService,
  StorageService,
  SidebarService,
  FormService,
  RestService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class CoreModule { }
