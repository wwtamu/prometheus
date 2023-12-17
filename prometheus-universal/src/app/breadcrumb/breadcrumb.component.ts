import { Component } from '@angular/core';

import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'prometheus-breadcrumb',
  styleUrls: ['breadcrumb.component.css'],
  templateUrl: 'breadcrumb.component.html',
  providers: [BreadcrumbService]
})
export class BreadcrumbComponent {

  constructor(public breadcrumbs: BreadcrumbService) {

  }

}
