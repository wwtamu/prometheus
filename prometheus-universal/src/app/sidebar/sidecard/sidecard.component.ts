import { Component, Input } from '@angular/core';

import { Sidebar } from '../sidebar';
import { Sidecard } from './sidecard';
import { User } from '../../auth/model/user';

@Component({
  selector: 'prometheus-sidecard',
  styleUrls: ['sidecard.component.css'],
  templateUrl: 'sidecard.component.html'
})
export class SidecardComponent {

  @Input() user: User;

  @Input() sidebar: Sidebar;

  @Input() sidecard: Sidecard;

  @Input() collapsed: boolean;

  @Input() editing: boolean;

}
