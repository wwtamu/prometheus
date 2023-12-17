import { Component, Input } from '@angular/core';

import { User } from '../auth/model/user';
import { Sidebar } from './sidebar';

@Component({
  selector: 'prometheus-sidebar',
  styleUrls: ['sidebar.component.css'],
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent {

  @Input() user: User;

  @Input() sidebar: Sidebar;

  @Input() collapsed: boolean;

  @Input() editing: boolean;

}
