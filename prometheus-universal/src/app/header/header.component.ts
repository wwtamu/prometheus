import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, animate, group, state, style, trigger, transition } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notification/notification.service';
import { User } from '../auth/model/user';
import { Role } from '../auth/model/role';

@Component({
  selector: 'prometheus-header',
  styleUrls: ['header.component.css'],
  templateUrl: 'header.component.html',
  animations: [
    trigger('collapse', [
      state('true', style({ height: '60px' })),
      state('false', style({ height: '225px' })),
      transition('1 => 0', [
        group([
          animate('0ms', style({ overflow: 'hidden' })),
          animate('350ms ease-in-out', style({ height: '225px' }))
        ])
      ]),
      transition('0 => 1', animate('350ms ease-in-out', style({ height: '60px', overflow: 'hidden' })))
    ])
  ]
})
export class HeaderComponent implements OnDestroy, OnInit {

  @Output() onToggleSidebarCollapse: EventEmitter<boolean>;

  @Output() onToggleSidebarEdit: EventEmitter<boolean>;

  @Input() user;

  @Input() collapsed: boolean;

  @Input() editing: boolean;

  private subscriptions: Array<Subscription>;

  private navCollapsedSubject: BehaviorSubject<boolean>;

  observableNavCollapsed: Observable<boolean>;

  constructor(private router: Router, public auth: AuthService, private notifications: NotificationService) {
    this.subscriptions = new Array<Subscription>();
    this.navCollapsedSubject = new BehaviorSubject(true);
    this.observableNavCollapsed = this.navCollapsedSubject.asObservable();
    this.onToggleSidebarCollapse = new EventEmitter<boolean>();
    this.onToggleSidebarEdit = new EventEmitter<boolean>();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event): void {
    this.collapse();
  }

  ngOnInit() {
    this.subscriptions.push(this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.collapse();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }

  private collapse(): void {
    this.navCollapsedSubject.next(true);
  }

  private expand(): void {
    this.navCollapsedSubject.next(false);
  }

  toggleNavbar(): void {
    this.navCollapsedSubject.getValue() ? this.expand() : this.collapse();
  }

  logout(): void {
    this.subscriptions.push(this.auth.logout().subscribe((result) => { }, (error) => { }, () => {
      this.router.navigate(['/home']);
      this.notifications.notify('app', {
        type: 'SUCCESS',
        i18n: 'logout.success',
        data: {},
        modifier: {
          type: 'DURATION',
          value: 15
        }
      });
    }));
  }

  toggleSidebar(value: boolean): void {
    this.onToggleSidebarCollapse.next(value);
  }

  edit(value: boolean): void {
    this.onToggleSidebarEdit.next(value);
  }

}
