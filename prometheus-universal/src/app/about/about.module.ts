import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { ContactModule } from './contact/contact.module';

@NgModule({
  imports: [
    SharedModule,
    AboutRoutingModule,
    ContactModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule {

}
