import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'prometheus-profile',
  styleUrls: ['profile.component.css'],
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {

  constructor(public auth: AuthService) {

  }

}
