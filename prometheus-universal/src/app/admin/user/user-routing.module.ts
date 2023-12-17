import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

import { AuthGuard } from '../../auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin/user', component: UserComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class UserRoutingModule {

}
