import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class SettingsRoutingModule { }
