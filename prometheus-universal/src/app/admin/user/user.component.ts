import { Component, Inject } from '@angular/core';

import { RestService } from '../../core/rest.service';

import { GLOBAL_CONFIG, GlobalConfig } from '../../../config';

@Component({
  selector: 'prometheus-user',
  styleUrls: ['user.component.css'],
  templateUrl: 'user.component.html'
})
export class UserComponent {

  constructor(private rest: RestService, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.rest.get({
      url: this.config.AUTH.ADMIN.USER.ALL,
      authorize: true
    }).subscribe((json: any) => {
      console.log(json);
    });
  }

}
