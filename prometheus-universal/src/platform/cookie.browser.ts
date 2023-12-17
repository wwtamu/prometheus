import { Injectable } from '@angular/core';

@Injectable()
export class BrowserCookie {

  set(name: string, value: string, days: number, path?: string): void {
    let date: Date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires: string = "expires=" + date.toUTCString();
    window.document.cookie = [name, "=", value, "; ", expires, path ? '; path=' + path : ''].join('');
  }

  get(name: string): string {
    let cookies: Array<string> = window.document.cookie.split(';');
    let cookie: string;
    for (let i in cookies) {
      let c: string = cookies[i].replace(/^\s\+/g, '');
      if (c.indexOf(name + '=') === 0) {
        cookie = c.substring(name.length + 1, c.length);
        break;
      }
    }
    return cookie;
  }

  remove(name: string): void {
    this.set(name, "", -1);
  }

}
