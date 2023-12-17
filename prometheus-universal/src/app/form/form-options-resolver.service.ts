import { Injectable } from '@angular/core';

import { Route } from '../../route';
import { routes } from '../../routes';

import { AuthService } from '../auth/auth.service';

import { FormFieldOption } from './field/form-field-option';

@Injectable()
export class FormOptionsResolverService {

  constructor(private auth: AuthService) {

  }

  resolve(reference: string): Array<FormFieldOption> {
    let options: Array<FormFieldOption> = new Array<FormFieldOption>();
    switch (reference) {
      case 'routes':
        for (let key in routes) {
          let route: Route = routes[key];
          if (this.auth.user.hasPermission(route.role)) {
            options.push(new FormFieldOption({
              gloss: route.path,
              value: route.path
            }));
          }
        }
        break;
      default:
        break;
    }
    return options;
  }
}
