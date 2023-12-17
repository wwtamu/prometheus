import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';

import { AuthGuard } from '../../auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin/application', component: ApplicationComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ApplicationRoutingModule {

}
