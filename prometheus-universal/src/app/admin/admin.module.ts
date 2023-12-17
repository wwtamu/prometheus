import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    AccountModule,
    UserModule,
    ApplicationModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule {

}
