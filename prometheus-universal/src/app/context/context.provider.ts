import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notification/notification.service';
import { Context } from './context';
import { User } from '../auth/model/user';

@Injectable()
export class ContextProvider {

  private contextSubject: BehaviorSubject<Context>;

  constructor(private router: Router, private auth: AuthService, private notifications: NotificationService) {
    this.contextSubject = <BehaviorSubject<Context>>new BehaviorSubject({});
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let path: string = this.removeQuery(event.urlAfterRedirects);
        this.contextSubject.next(new Context(path));
        this.notifications.clearRouteChangeDissmissable();
      }
    });
    this.auth.observableUser.subscribe((user: User) => {
      this.contextSubject.next(this.contextSubject.getValue());
    });
  }

  private removeQuery(url: string) {
    let queryStartingIndex = url.indexOf('?');
    return queryStartingIndex >= 0 ? url.substring(0, queryStartingIndex) : url;
  }

  get observableContext(): Observable<Context> {
    return this.contextSubject.asObservable();
  }

}
