import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { NotificationService } from '../notification/notification.service';

import { AuthService } from './auth.service';
import { RedirectService } from '../core/redirect.service';
import { Role } from './model/role';
import { User } from './model/user';

import { routes } from '../../routes';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private redirect: RedirectService, private notifications: NotificationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let path: string = route.url[0].path;
    return Observable.create((subscriber) => {
      if (this.auth.isAuthenticated()) {
        if (this.auth.user.isAnonymous()) {
          this.auth.observableUser.subscribe((user: User) => {
            // ignore the default user
            if (!user.isAnonymous()) {
              if (user !== undefined && user.hasPermission(this.getRequiredRole(path))) {
                this.activate(subscriber);
              }
              else {
                this.navigateToHome(subscriber, path);
              }
            }
          });
        }
        else {
          if (this.auth.user.hasPermission(this.getRequiredRole(path))) {
            this.activate(subscriber);
          }
          else {
            this.navigateToHome(subscriber, path);
          }
        }
      }
      else {
        this.navigateToLogin(subscriber, path);
      }
    });
  }

  private getRequiredRole(path: string): Role {
    return routes[path].role;
  }

  private activate(observer: any): void {
    this.completeSubscription(observer, true);
  }

  private navigateToHome(observer: any, path: string): void {
    this.router.navigate(['/home']);
    this.completeSubscription(observer, false);
    this.notifications.notify('app', {
      type: 'DANGER',
      i18n: 'path.unauthorized',
      data: {
        path: path
      },
      modifier: {
        type: 'NAVIGATION',
        value: 1
      }
    });
  }

  private navigateToLogin(observer: any, path: string): void {
    this.redirect.referrer = path;
    this.router.navigate(['/login']);
    this.completeSubscription(observer, false);
    this.notifications.notify('app', {
      type: 'DANGER',
      i18n: 'path.unauthenticated',
      data: {
        path: path
      },
      modifier: {
        type: 'NAVIGATION',
        value: 1
      }
    });
  }

  private completeSubscription(observer: any, result: boolean): void {
    observer.next(result);
    observer.complete();
  }

}
