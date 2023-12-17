import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';

import { AuthGuard } from '../../auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin/account', component: AccountComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class AccountRoutingModule {

}
