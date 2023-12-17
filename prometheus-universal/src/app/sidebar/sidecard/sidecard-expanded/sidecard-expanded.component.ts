import { Component, Inject, Input, OnDestroy, animate, state, style, trigger, transition } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs/Subscription';

import { GLOBAL_CONFIG, GlobalConfig } from '../../../../config';

import { SidebarService } from '../../sidebar.service';
import { Sidebar } from '../../sidebar';
import { Sidecard } from '../sidecard';
import { SidecardLink } from '../sidecard-link';
import { User } from '../../../auth/model/user';

import { FormModalComponent } from '../../../form/modal/form-modal.component';
import { ConfirmModalComponent } from '../../../modal/confirm/confirm-modal.component';

@Component({
  selector: 'prometheus-sidecard-expanded',
  styleUrls: ['sidecard-expanded.component.css'],
  templateUrl: 'sidecard-expanded.component.html',
  animations: [
    trigger('collapse', [
      state('true', style({ opacity: 0, height: 0, width: 0 })),
      state('false', style({ opacity: 1, height: '100%', width: '100%' })),
      transition('1 => 0', animate('350ms ease-in-out', style({ width: '100%', height: '100%', opacity: 1 }))),
      transition('0 => 1', animate('0ms ease-in-out', style({ opacity: 0, height: 0, width: 0 })))
    ])
  ]
})
export class SidecardExpandedComponent implements OnDestroy {

  @Input() user: User;

  @Input() sidebar: Sidebar;

  @Input() sidecard: Sidecard;

  @Input() collapsed: boolean;

  @Input() editing: boolean;

  private subscriptions: Array<Subscription>;

  constructor(private sidebars: SidebarService, private modals: NgbModal, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.subscriptions = new Array<Subscription>();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }

  editCard(): void {
    const modalRef = this.modals.open(FormModalComponent);
    modalRef.componentInstance.name = 'SIDECARD';
    modalRef.componentInstance.label = 'form.modal.editSidecard';
    modalRef.componentInstance.data = this.sidecard;
    this.subscriptions.push(modalRef.componentInstance.onSubmitEmitter.subscribe((data: any) => {
      this.subscriptions.push(this.sidebars.editCard(data).subscribe((success: boolean) => {
        if (success) {
          modalRef.close();
        }
        else {
          console.error("Could not edit card!");
        }
      }));
    }));
  }

  removeCard(): void {
    const modalRef = this.modals.open(ConfirmModalComponent);
    modalRef.componentInstance.label = 'form.modal.removeSidecard';
    modalRef.componentInstance.data = this.sidecard;
    this.subscriptions.push(modalRef.componentInstance.onConfirmEmitter.subscribe((confirm: boolean) => {
      this.subscriptions.push(this.sidebars.removeCard(this.sidecard).subscribe((success: boolean) => {
        if (success) {
          modalRef.close();
        }
        else {
          console.error("Could not remove section!");
        }
      }));
    }));
  }

  addLink(): void {
    const modalRef = this.modals.open(FormModalComponent);
    modalRef.componentInstance.name = 'SIDECARDLINK';
    modalRef.componentInstance.data = {
      "icon": 'fa fa-link',
      "external": false
    };
    modalRef.componentInstance.label = 'form.modal.addSidecardLink';
    this.subscriptions.push(modalRef.componentInstance.onSubmitEmitter.subscribe((data: any) => {
      this.subscriptions.push(this.sidebars.addLink(this.sidecard, data).subscribe((success: boolean) => {
        if (success) {
          modalRef.close();
        }
        else {
          console.error("Could not add link!");
        }
      }));
    }));
  }

  editLink(sidecardLink: SidecardLink): void {
    const modalRef = this.modals.open(FormModalComponent);
    modalRef.componentInstance.name = 'SIDECARDLINK';
    modalRef.componentInstance.label = 'form.modal.editSidecardLink';
    modalRef.componentInstance.data = sidecardLink;
    this.subscriptions.push(modalRef.componentInstance.onSubmitEmitter.subscribe((data: any) => {
      this.subscriptions.push(this.sidebars.editLink(this.sidecard, data).subscribe((success: boolean) => {
        if (success) {
          modalRef.close();
        }
        else {
          console.error("Could not edit link!");
        }
      }));
    }));
  }

  removeLink(sidecardLink: SidecardLink): void {
    const modalRef = this.modals.open(ConfirmModalComponent);
    modalRef.componentInstance.label = 'form.modal.removeSidecardLink';
    modalRef.componentInstance.data = sidecardLink;
    this.subscriptions.push(modalRef.componentInstance.onConfirmEmitter.subscribe((confirm: boolean) => {
      this.subscriptions.push(this.sidebars.removeLink(this.sidecard, sidecardLink).subscribe((success: boolean) => {
        if (success) {
          modalRef.close();
        }
        else {
          console.error("Could not remove link!");
        }
      }));
    }));
  }

  canEdit(): boolean {
    return !this.collapsed && !this.user.isAnonymous() && this.user.username === this.sidebar.username && (this.user.username === this.config.AUTH.DEFAULT.USERNAME || this.sidecard.custom) && this.editing;
  }

}
