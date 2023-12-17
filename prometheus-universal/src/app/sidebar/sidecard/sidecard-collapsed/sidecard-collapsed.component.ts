import { Component, Input, animate, state, style, trigger, transition } from '@angular/core';

import { Sidecard } from '../sidecard';

@Component({
  selector: 'prometheus-sidecard-collapsed',
  styleUrls: ['sidecard-collapsed.component.css'],
  templateUrl: 'sidecard-collapsed.component.html',
  animations: [
    trigger('expand', [
      state('true', style({ opacity: 1, height: '100%', width: '100%' })),
      state('false', style({ opacity: 0, height: 0, width: 0 })),
      transition('1 => 0', animate('0ms ease-in-out', style({ opacity: 0, height: 0, width: 0 }))),
      transition('0 => 1', animate('350ms ease-in-out', style({ opacity: 1, height: '100%', width: '100%' })))
    ])
  ]
})
export class SidecardCollapsedComponent {

  @Input() sidecard: Sidecard;

  @Input() collapsed: boolean;

  @Input() editing: boolean;

}
