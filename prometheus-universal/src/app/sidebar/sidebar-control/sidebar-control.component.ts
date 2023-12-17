import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SidebarService } from '../sidebar.service';
import { Sidebar } from '../sidebar';
import { Sidecard } from '../sidecard/sidecard';
import { ContextProvider } from '../../context/context.provider';
import { Context } from '../../context/context';
import { User } from '../../auth/model/user';

import { FormModalComponent } from '../../form/modal/form-modal.component';

@Component({
  selector: 'prometheus-sidebar-control',
  styleUrls: ['sidebar-control.component.css'],
  templateUrl: 'sidebar-control.component.html'
})
export class SidebarControlComponent implements OnDestroy {

  @Output() onToggleSidebarEdit: EventEmitter<boolean>;

  @Output() onToggleSidebarCollapse: EventEmitter<boolean>;

  @Input() user: User;

  @Input() editing: boolean;

  @Input() collapsed: boolean;

  private subscriptions: Array<Subscription>;

  constructor(private contextProvider: ContextProvider, public sidebars: SidebarService, private modals: NgbModal) {
    this.subscriptions = new Array<Subscription>();
    this.onToggleSidebarEdit = new EventEmitter<boolean>();
    this.onToggleSidebarCollapse = new EventEmitter<boolean>();
    this.subscriptions.push(this.contextProvider.observableContext.subscribe((context: Context) => {
      this.onToggleSidebarEdit.next(false);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  toggle(): void {
    this.onToggleSidebarEdit.next(false);
    this.onToggleSidebarCollapse.next(!this.collapsed);
  }

  edit(): void {
    this.onToggleSidebarEdit.next(true);
  }

  addCard(): void {
    const modalRef = this.modals.open(FormModalComponent);
    modalRef.componentInstance.name = 'SIDECARD';
    modalRef.componentInstance.label = 'form.modal.addSidecard';
    this.subscriptions.push(modalRef.componentInstance.onSubmitEmitter.subscribe((data: any) => {
      this.subscriptions.push(this.sidebars.addCard(data).subscribe((success: boolean) => {
        if (success) {
          modalRef.close();
        }
        else {
          console.error("Could not add section!");
        }
      }));
    }));
  }

  exit(): void {
    this.onToggleSidebarEdit.next(false);
  }

}
