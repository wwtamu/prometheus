import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'prometheus-form-modal-content',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent {

  @Output('onSubmitEmitter') onSubmitEmitter: EventEmitter<any>;

  @Input() name;

  @Input() data;

  @Input() label;

  public finished: BehaviorSubject<boolean>;

  constructor(public activeModal: NgbActiveModal) {
    this.onSubmitEmitter = new EventEmitter<any>();
    this.finished = new BehaviorSubject(false);
  }

  submit(data: any): void {
    this.onSubmitEmitter.next(data);
  }

  cancel(data: string): void {
    this.activeModal.dismiss(data);
  }

}
