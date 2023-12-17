import { Component, HostListener } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from 'ng2-translate';

import { AuthService } from './auth/auth.service';
import { SidebarService } from './sidebar/sidebar.service';

@Component({
  selector: 'prometheus-app',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent {

  private collapsedFromResize: boolean;

  private sidebarCollapsedSubject: BehaviorSubject<boolean>;

  private sidebarEditSubject: BehaviorSubject<boolean>;

  observableSidebarCollapsed: Observable<boolean>;

  observableSidebarEdit: Observable<boolean>;

  channel: string;

  constructor(public translate: TranslateService, public auth: AuthService, public sidebars: SidebarService) {
    this.collapsedFromResize = false;
    this.sidebarCollapsedSubject = new BehaviorSubject(false);
    this.observableSidebarCollapsed = this.sidebarCollapsedSubject.asObservable();
    this.sidebarEditSubject = new BehaviorSubject(false);
    this.observableSidebarEdit = this.sidebarEditSubject.asObservable();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.channel = 'app';

    console.log('Hello, World!', {
      App: 'Prometheus Universal'
    });

  }

  @HostListener('window:resize', ['$event'])
  private onResize(event): void {
    if (event.target.innerWidth < 576) {
      if (!this.sidebarCollapsedSubject.getValue()) {
        this.collapseSidebar();
        this.collapsedFromResize = true;
      }
    }
    if (event.target.innerWidth >= 576) {
      if (this.collapsedFromResize) {
        this.expandSidebar();
        this.collapsedFromResize = false;
      }
    }
  }

  private collapseSidebar(): void {
    this.sidebarCollapsedSubject.next(true);
  }

  private expandSidebar(): void {
    this.sidebarCollapsedSubject.next(false);
  }

  toggleSidebar(value: boolean): void {
    this.sidebarCollapsedSubject.next(value);
  }

  editSidebar(value: boolean): void {
    this.sidebarEditSubject.next(value);
  }

}
