import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { SidebarControlComponent } from './sidebar-control/sidebar-control.component';
import { SidecardComponent } from './sidecard/sidecard.component';
import { SidecardExpandedComponent } from './sidecard/sidecard-expanded/sidecard-expanded.component';
import { SidecardCollapsedComponent } from './sidecard/sidecard-collapsed/sidecard-collapsed.component';

import { SidebarService } from './sidebar.service';

import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [
  // put sidebar components here
  SidebarComponent,
  SidebarControlComponent,
  SidecardComponent,
  SidecardExpandedComponent,
  SidecardCollapsedComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ...COMPONENTS
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [
    SidebarService
  ]
})
export class SidebarModule { }
