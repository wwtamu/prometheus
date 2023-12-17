import { NgModule } from '@angular/core';

import { FormModule } from '../../form/form.module';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';

import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    FormModule,
    SharedModule,
    RegistrationRoutingModule
  ],
  declarations: [
    RegistrationComponent
  ],
  providers: [
    AuthService
  ]
})
export class RegistrationModule {

}
