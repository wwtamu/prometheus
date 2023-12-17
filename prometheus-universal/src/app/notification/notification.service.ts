import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { CacheService } from '../core/cache.service';
import { Notification } from './notification';

@Injectable()
export class NotificationService {

  private CACHE_PREFIX: string = "NOTIFICATION";

  private notificationStore: Map<string, Array<Notification>>;

  private notificationSubjects: Map<string, BehaviorSubject<Array<Notification>>>;

  constructor(private translate: TranslateService, private cache: CacheService) {
    this.notificationStore = new Map<string, Array<Notification>>();
    this.notificationSubjects = new Map<string, BehaviorSubject<Array<Notification>>>();
  }

  private cacheKey(channel: string, i18nKey: string): string {
    return [this.CACHE_PREFIX, '-', channel, ':', i18nKey].join('');;
  }

  registerChannel(channel: string): Observable<Array<Notification>> {
    this.notificationStore.set(channel, new Array<Notification>());
    this.notificationSubjects.set(channel, new BehaviorSubject(this.notificationStore.get(channel)));
    return this.notificationSubjects.get(channel).asObservable();
  }

  notify(channel: string, json: any): void {
    this.add(channel, new Notification(json));
  }

  add(channel: string, notification: Notification): void {
    // get cached notification
    let cachedNotification: any = this.cache.get(this.cacheKey(channel, notification.i18n));
    if (cachedNotification) {
      notification.message = cachedNotification._message;
    }
    else {
      // transalte i18n with data onto message
      notification.message = this.translate.instant(notification.i18n, notification.data);
      this.cache.set(this.cacheKey(channel, notification.i18n), notification);
    }
    let notifications = this.notificationStore.get(channel);
    notifications.push(notification);
    // set timeout if duration is defined
    if (notification.duration) {
      Observable.timer(notification.duration).subscribe(() => {
        this.remove(channel, notification);
      });
    }
    this.notificationSubjects.get(channel).next(notifications);
  }

  remove(channel: string, notification: Notification): void {
    this.cache.remove(this.cacheKey(channel, notification.i18n));
    let notifications = this.notificationStore.get(channel);
    for (let i = notifications.length - 1; i >= 0; i--) {
      if (notifications[i].id === notification.id) {
        notifications.splice(i, 1);
        break;
      }
    }
    this.notificationSubjects.get(channel).next(notifications);
  }

  clearRouteChangeDissmissable(): void {
    this.notificationStore.forEach((notifications: Array<Notification>, channel: string) => {
      notifications.forEach((notification: Notification) => {
        if (notification.routeChanges === 0) {
          this.remove(channel, notification);
        }
        else {
          notification.routeChanges--;
        }
      });
      this.notificationStore.set(channel, notifications);
    });
  }

}
