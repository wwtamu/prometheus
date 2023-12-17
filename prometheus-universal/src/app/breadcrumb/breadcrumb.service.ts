import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ContextProvider } from '../context/context.provider';
import { Context } from '../context/context';
import { Breadcrumb } from './breadcrumb';

@Injectable()
export class BreadcrumbService {

  private breadcrumbs: Array<Breadcrumb>;

  private breadcrumbsSubject: BehaviorSubject<Array<Breadcrumb>>;

  constructor(private contextProvider: ContextProvider) {
    this.breadcrumbs = new Array<Breadcrumb>();
    this.breadcrumbsSubject = <BehaviorSubject<Array<Breadcrumb>>>new BehaviorSubject(this.breadcrumbs);
    this.contextProvider.observableContext.subscribe((context: Context) => {
      if (context.path) {
        this.processContextPath(context.path);
      }
    });
  }

  private processContextPath(path: string): void {
    this.clearBreadcrumbs();
    let routes: Array<string> = this.removeFirstCharacter(path).split('/');
    let level: number = 1;
    let link: string = '';
    routes.forEach(route => {
      link += this.routeToLink(route);
      let breadcrumb: Breadcrumb = new Breadcrumb(this.routeToLabel(route), link, level++);
      this.add(breadcrumb);
    });
  }

  private clearBreadcrumbs(): void {
    this.breadcrumbs.length = 0;
  }

  private routeToLabel(route: string): string {
    return ['breadcrumb', route].join('.');
  }

  private routeToLink(link: string): string {
    return ['/', link].join('');
  }

  private removeFirstCharacter(value: string): string {
    return value.substring(1, value.length);
  }

  private findLevel(link: string): number {
    return link.split('/').length - 1;
  }

  private add(breadcrumb: Breadcrumb): void {
    this.breadcrumbs.push(breadcrumb);
    this.breadcrumbsSubject.next(this.breadcrumbs);
  }

  get observableBreadcrumbs(): Observable<Array<Breadcrumb>> {
    return this.breadcrumbsSubject.asObservable();
  }

}
