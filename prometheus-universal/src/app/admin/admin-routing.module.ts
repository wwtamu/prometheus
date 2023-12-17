import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class AdminRoutingModule {

}
