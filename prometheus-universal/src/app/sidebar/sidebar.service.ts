import { Inject, Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

import { CacheService } from '../core/cache.service';
import { RestService } from '../core/rest.service';
import { AuthService } from '../auth/auth.service';
import { ContextProvider } from '../context/context.provider';
import { Context } from '../context/context';
import { Sidebar } from './sidebar';
import { Sidecard } from './sidecard/sidecard';
import { SidecardLink } from './sidecard/sidecard-link';

@Injectable()
export class SidebarService {

  private cachePrefix: string = "SIDEBAR";

  private sidebarServerPath: string;

  private sidebarStore: Map<string, Sidebar>;

  private sidebarSubject: BehaviorSubject<Sidebar>;

  private previousContext: Context;

  observableSidebar: Observable<Sidebar>;

  constructor(private cache: CacheService, private rest: RestService, private auth: AuthService, private contextProvider: ContextProvider, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.sidebarStore = new Map<string, Sidebar>();
    this.sidebarSubject = <BehaviorSubject<Sidebar>>new BehaviorSubject({});
    this.observableSidebar = this.sidebarSubject.asObservable();
    this.contextProvider.observableContext.subscribe((context: Context) => {
      if (context.key) {
        if (context === this.previousContext) {
          this.sidebarStore.forEach((value, name) => {
            this.cache.remove(this.cacheKey(name));
          });
          this.sidebarStore.clear();
        }
        this.previousContext = context;
        this.getSidebar(context.key).subscribe((sidebar: Sidebar) => {
          this.sidebarSubject.next(sidebar);
        });
      }
    });
  }

  private cacheKey(name: string): string {
    return [this.cachePrefix, '-', name].join('');
  }

  private getSidebar(name: string): Observable<Sidebar> {
    return Observable.create(observer => {
      let sidebar: Sidebar;
      // check the local store for the sidebar
      sidebar = this.sidebarStore.get(name);
      if (sidebar) {
        observer.next(sidebar);
        observer.complete();
      }
      else {
        // check the cache for the sidebar
        let cachedSidebar = this.cache.get(this.cacheKey(name));
        if (cachedSidebar) {
          sidebar = new Sidebar(cachedSidebar);
          this.sidebarStore.set(name, sidebar);
          observer.next(sidebar);
          observer.complete();
        }
        else {
          this.fetchSidebar(name, observer);
        }
      }
    });
  }

  private fetchSidebar(name: string, observer: any): void {
    // fetch the sidebar
    this.rest.get({
      url: [this.config.DAM.SIDEBAR, '/', name].join(''),
      authorize: !this.auth.user.isAnonymous()
    }).subscribe((json: any) => {
      this.cache.set(this.cacheKey(name), json);
      let sidebar: Sidebar = new Sidebar(json);
      this.sidebarStore.set(name, sidebar);
      observer.next(sidebar);
      observer.complete();
    });
  }

  private processObserver(success: boolean, observer: any): void {
    observer.next(success);
    observer.complete();
  }

  addCard(data: any): Observable<boolean> {
    return Observable.create(observer => {
      let sidebar: Sidebar = this.sidebarSubject.getValue();
      this.rest.post({
        url: [this.config.DAM.SIDEBAR, '/', sidebar.name, '/card'].join(''),
        data: {
          "title": data.title,
          "info": data.info,
          "custom": true
        },
        authorize: true
      }).subscribe((json: any) => {
        let success: boolean = json ? true : false;
        if (success && sidebar.addCustomSidecard(new Sidecard(json))) {
          this.sidebarSubject.next(sidebar);
        }
        this.processObserver(success, observer);
      });
    });
  }

  removeCard(sidecard: Sidecard): Observable<boolean> {
    return Observable.create(observer => {
      let sidebar: Sidebar = this.sidebarSubject.getValue();
      this.rest.delete({
        url: [this.config.DAM.SIDEBAR, '/', sidebar.name, '/card', '/', sidecard.id, '/remove'].join(''),
        authorize: true
      }).subscribe((json: any) => {
        let success: boolean = json ? true : false;
        if (success && sidebar.removeSidecard(sidecard)) {
          this.sidebarSubject.next(sidebar);
        }
        this.processObserver(success, observer);
      });
    });
  }

  editCard(sidecard: Sidecard): Observable<boolean> {
    return Observable.create(observer => {
      let sidebar: Sidebar = this.sidebarSubject.getValue();
      this.rest.post({
        url: [this.config.DAM.SIDEBAR, '/', sidebar.name, '/card/update'].join(''),
        data: {
          "id": sidecard.id,
          "title": sidecard.title,
          "info": sidecard.info,
          "custom": true
        },
        authorize: true
      }).subscribe((json: any) => {
        let success: boolean = json ? true : false;
        if (success && sidebar.updateSidecard(new Sidecard(json))) {
          this.sidebarSubject.next(sidebar);
        }
        this.processObserver(success, observer);
      });
    });
  }

  addLink(sidecard: Sidecard, sidecardLink: SidecardLink): Observable<boolean> {
    return Observable.create(observer => {
      let sidebar: Sidebar = this.sidebarSubject.getValue();
      this.rest.post({
        url: [this.config.DAM.SIDEBAR, '/', sidebar.name, '/card', '/', sidecard.id, '/link'].join(''),
        data: {
          "id": sidecardLink.id,
          "destination": sidecardLink.destination,
          "label": sidecardLink.label,
          "icon": sidecardLink.icon,
          "external": sidecardLink.external
        },
        authorize: true
      }).subscribe((json: any) => {
        let success: boolean = json ? true : false;
        if (success && sidecard.addLink(new SidecardLink(json))) {
          this.sidebarSubject.next(sidebar);
        }
        this.processObserver(success, observer);
      });
    });
  }

  removeLink(sidecard: Sidecard, sidecardLink: SidecardLink): Observable<boolean> {
    return Observable.create(observer => {
      let sidebar: Sidebar = this.sidebarSubject.getValue();
      this.rest.delete({
        url: [this.config.DAM.SIDEBAR, '/', sidebar.name, '/card', '/', sidecard.id, '/link', '/', + sidecardLink.id, '/remove'].join(''),
        authorize: true
      }).subscribe((json: any) => {
        let success: boolean = json ? true : false;
        if (success && sidecard.removeLink(sidecardLink)) {
          this.sidebarSubject.next(sidebar);
        }
        this.processObserver(success, observer);
      });
    });
  }

  editLink(sidecard: Sidecard, sidecardLink: SidecardLink): Observable<boolean> {
    return Observable.create(observer => {
      let sidebar: Sidebar = this.sidebarSubject.getValue();
      this.rest.post({
        url: [this.config.DAM.SIDEBAR, '/', sidebar.name, '/card', '/', sidecard.id, '/link', '/', + sidecardLink.id, '/update'].join(''),
        data: {
          "id": sidecardLink.id,
          "destination": sidecardLink.destination,
          "label": sidecardLink.label,
          "icon": sidecardLink.icon,
          "external": sidecardLink.external
        },
        authorize: true
      }).subscribe((json: any) => {
        let success: boolean = json ? true : false;
        if (success && sidecard.updateLink(new SidecardLink(json))) {
          this.sidebarSubject.next(sidebar);
        }
        this.processObserver(success, observer);
      });
    });
  }

}
