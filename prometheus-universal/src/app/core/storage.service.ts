import { Inject, Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor( @Inject('Storage') private storage) {

  }

  set(key: string, value: string): void {
    this.storage.set(key, value);
  }

  get(key: string): string {
    return this.storage.get(key);
  }

  remove(key: string): void {
    this.storage.remove(key);
  }

  clear(): void {
    this.storage.clear();
  }

}
