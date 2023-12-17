import { Inject, Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor( @Inject('Cookies') private cookies) {

  }

  set(name: string, value: string, days: number, path?: string): void {
    this.cookies.set(name, value, days, path);
  }

  get(name: string): string {
    return this.cookies.get(name);
  }

  remove(name: string): void {
    this.cookies.remove(name);
  }

}
