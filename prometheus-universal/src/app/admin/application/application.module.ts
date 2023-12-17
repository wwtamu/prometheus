import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ApplicationRoutingModule
  ],
  declarations: [
    ApplicationComponent
  ]
})
export class ApplicationModule {

}
