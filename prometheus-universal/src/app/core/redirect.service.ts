import { Injectable } from '@angular/core';

@Injectable()
export class RedirectService {

  private _referrer: string;

  get referrer(): string {
    return this._referrer;
  }

  set referrer(referrer: string) {
    this._referrer = referrer;
  }

  reset(): void {
    this.referrer = undefined;
  }

}
