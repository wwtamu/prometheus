import { Component, Inject } from '@angular/core';

import { RestService } from '../../core/rest.service';

import { GLOBAL_CONFIG, GlobalConfig } from '../../../config';

@Component({
  selector: 'prometheus-application',
  styleUrls: ['application.component.css'],
  templateUrl: 'application.component.html'
})
export class ApplicationComponent {

  constructor(private rest: RestService, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.rest.get({
      url: this.config.AUTH.ADMIN.APPLICATION.ALL,
      authorize: true
    }).subscribe((json: any) => {
      console.log(json);
    });
  }

}
