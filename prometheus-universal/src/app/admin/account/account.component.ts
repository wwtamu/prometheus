import { Component, Inject } from '@angular/core';

import { RestService } from '../../core/rest.service';

import { GLOBAL_CONFIG, GlobalConfig } from '../../../config';

@Component({
  selector: 'prometheus-account',
  styleUrls: ['account.component.css'],
  templateUrl: 'account.component.html'
})
export class AccountComponent {

  constructor(private rest: RestService, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.rest.get({
      url: this.config.AUTH.ADMIN.ACCOUNT.ALL,
      authorize: true
    }).subscribe((json: any) => {
      console.log(json);
    });
  }

}
