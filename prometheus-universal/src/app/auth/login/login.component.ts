import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { FormInput } from '../../form/form-input';

import { AuthService } from '../auth.service';
import { RedirectService } from '../../core/redirect.service';
import { FormService } from '../../form/form.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'prometheus-login',
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnDestroy {

  private loginSubription: Subscription;

  finished: BehaviorSubject<boolean>;

  constructor(private router: Router, private auth: AuthService, private redirect: RedirectService, private forms: FormService, private notifications: NotificationService) {
    this.finished = new BehaviorSubject(false);
  }

  ngOnDestroy() {
    if (this.loginSubription) {
      this.loginSubription.unsubscribe();
    }
    this.finished.complete();
  }

  login(data: any): void {
    this.loginSubription = this.auth.login(data).subscribe((success: boolean) => {
      if (success) {
        if (this.redirect.referrer) {
          this.router.navigate([this.redirect.referrer]);
          this.redirect.reset();
        }
        else {
          this.router.navigate(['/home']);
        }
        this.forms.notify('LOGIN');
        this.notifications.notify('app', {
          type: 'SUCCESS',
          i18n: 'login.success',
          data: data,
          modifier: {
            type: 'DURATION',
            value: 15
          }
        });
      }
      this.finished.next(true);
    });
  }

}
