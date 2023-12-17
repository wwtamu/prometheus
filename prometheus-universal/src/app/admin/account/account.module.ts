import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountComponent
  ]
})
export class AccountModule {

}
