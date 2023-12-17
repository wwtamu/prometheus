import { Injectable } from '@angular/core';

@Injectable()
export class NodeCookie {

  set(name: string, value: string, days: number, path: string = ""): void {

  }

  get(name: string): string {
    return Zone.current.get('req').cookies[name];
  }

  remove(name: string): void {

  }

}
