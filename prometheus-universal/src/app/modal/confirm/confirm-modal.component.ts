import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'prometheus-confirm-modal-content',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Output('onConfirmEmitter') onConfirmEmitter: EventEmitter<boolean>;

  @Input() data;

  @Input() label;

  keys: Array<string>;

  constructor(public activeModal: NgbActiveModal) {
    this.onConfirmEmitter = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.keys = Object.keys(this.data);
  }

  confirm(): void {
    this.onConfirmEmitter.next(true);
  }

  cancel(data: string): void {
    this.activeModal.dismiss(data);
  }

}
