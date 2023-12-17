import { NgModule } from '@angular/core';

import { FormModule } from '../../form/form.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { AuthService } from '../auth.service';
import { RedirectService } from '../../core/redirect.service';

@NgModule({
  imports: [
    FormModule,
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    RedirectService
  ]
})
export class LoginModule {

}
