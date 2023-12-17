import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { FormService } from '../../form/form.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'prometheus-registration',
  styleUrls: ['registration.component.css'],
  templateUrl: 'registration.component.html'
})
export class RegistrationComponent implements OnDestroy, OnInit {

  private verified: boolean;

  private subscriptions: Array<Subscription>;

  finished: BehaviorSubject<boolean>;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private forms: FormService, private notifications: NotificationService) {
    this.subscriptions = new Array<Subscription>();
    this.finished = new BehaviorSubject(false);
  }

  ngOnInit() {
    this.subscriptions.push(this.route.queryParams.subscribe(queryParams => {
      this.verified = queryParams['token'] ? true : false;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
    this.finished.complete();
  }

  verify(data: any): void {
    this.subscriptions.push(this.auth.verify(data).subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['/home']);
        this.forms.notify('VERIFY');
        this.notifications.notify('app', {
          type: 'SUCCESS',
          i18n: 'registration.verify',
          data: data,
          modifier: {
            type: 'DURATION',
            value: 30
          }
        });
      }
      this.finished.next(true);
    }));
  }

  register(data: any): void {
    this.subscriptions.push(this.auth.register(data).subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['/home']);
        this.forms.notify('REGISTER');
        this.notifications.notify('app', {
          type: 'SUCCESS',
          i18n: 'registration.complete',
          data: data,
          modifier: {
            type: 'DURATION',
            value: 30
          }
        });
      }
      this.finished.next(true);
    }));
  }

  isVerified(): boolean {
    return this.verified;
  }

}
