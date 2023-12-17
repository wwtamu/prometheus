import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

import { CookieService } from '../core/cookie.service';
import { CacheService } from '../core/cache.service';
import { RestService } from '../core/rest.service';
import { NotificationService } from '../notification/notification.service';
import { Application } from './model/application';
import { Authority } from './model/authority';
import { User } from './model/user';
import { Role } from './model/role';

@Injectable()
export class AuthService {

  private userSubject: BehaviorSubject<User>;

  observableUser: Observable<User>;

  constructor(private cookies: CookieService, private cache: CacheService, private rest: RestService, private notifications: NotificationService, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    let defaultUser: User = new User({
      "id": undefined,
      "username": undefined,
      "firstName": undefined,
      "lastName": undefined,
      "email": undefined,
      "authorities": [
        {
          "id": undefined,
          "role": "ROLE_ANONYMOUS",
          "scope": []
        }
      ]
    });
    this.userSubject = new BehaviorSubject(defaultUser);
    this.observableUser = this.userSubject.asObservable();
    this.rest.observableToken.subscribe((token: string) => {
      if (token) {
        this.cache.set('token', token);
        this.setTokenCookie(token);
        this.fetchUser().subscribe((user: User) => {
          this.userSubject.next(user);
        });
      }
      else {
        this.cache.remove('user');
        this.cache.remove('token');
        this.cookies.remove('token');
        this.userSubject.next(defaultUser);
      }
    });
    let token: string = this.cache.get('token');
    if (token) {
      this.cache.remove('token');
      this.setTokenCookie(token);
    }
    else {
      token = this.cookies.get('token');
    }
    if (token) {
      this.rest.token = token;
    }
  }

  private setTokenCookie(token: string) {
    // TODO: make expiration configurable
    this.cookies.set('token', token, 365);
  }

  private fetchUser(): Observable<User> {
    let observable: any;
    let cachedUser: any = this.cache.get('user');
    if (cachedUser) {
      observable = Observable.create(observer => {
        observer.next(new User(cachedUser));
        observer.complete();
      });
    }
    else {
      observable = this.rest.get({
        url: this.config.DAM.USER,
        authorize: true
      }).map((response: any) => {
        // cache the json representation
        this.cache.set('user', response);
        let user: User = new User(response);
        return user;
      });
    }
    return observable
  }

  private processResponse(observer: any, response: any): void {
    if (response) {
      observer.next(true);
    }
    else {
      observer.next(false);
    }
    observer.complete();
  }

  private processError(observer: any, error: any, data?: any): void {
    observer.next(false);
    observer.complete();
    this.notifications.notify('app', {
      type: 'DANGER',
      i18n: JSON.parse(error._body).i18n,
      data: data ? data : {},
      modifier: {
        type: 'NAVIGATION',
        value: 0
      }
    });
  }

  login(data: any): Observable<boolean> {
    return Observable.create(observer => {
      return this.rest.post({
        url: this.config.AUTH.LOGIN,
        data: data
      }).subscribe((response) => {
        if (response.token) {
          this.rest.token = response.token;
        }
        this.processResponse(observer, response);
      }, (error) => {
        this.processError(observer, error, data);
      });
    });
  }

  logout(): Observable<boolean> {
    return Observable.create(observer => {
      this.rest.token = undefined;
      observer.next(true);
      observer.complete();
    });
  }

  verify(data: any): Observable<boolean> {
    return Observable.create(observer => {
      return this.rest.post({
        url: this.config.AUTH.VERIFY,
        data: data
      }).subscribe((response) => {
        this.processResponse(observer, response);
      }, (error) => {
        this.processError(observer, error, data);
      });
    });
  }

  register(data: any): Observable<boolean> {
    return Observable.create(observer => {
      return this.rest.post({
        url: this.config.AUTH.REGISTER,
        data: data
      }).subscribe((response) => {
        if (response.token) {
          this.rest.token = response.token;
        }
        this.processResponse(observer, response);
      }, (error) => {
        this.processError(observer, error, data);
      });
    });
  }

  isAuthenticated(): boolean {
    return this.rest.token ? true : false;
  }

  get user(): User {
    return this.userSubject.getValue();
  }

}
