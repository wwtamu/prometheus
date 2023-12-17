import { Component, EventEmitter, Input, OnDestroy, OnInit, Output  } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { FormInput } from './form-input';
import { FormService } from './form.service';

@Component({
  selector: 'prometheus-form',
  styleUrls: ['form.component.css'],
  templateUrl: 'form.component.html'
})
export class FormComponent implements OnDestroy, OnInit {

  @Output('onSubmitEmitter') onSubmitEmitter: EventEmitter<any>;

  @Output('onCancelEmitter') onCancelEmitter: EventEmitter<string>;

  @Input() name: string;

  @Input() data: any;

  @Input() finishedObservable: Observable<boolean>;

  private subscriptions: Array<Subscription>;

  private token: string;

  private processing: boolean;

  form: FormGroup;

  inputs: Map<string, FormInput>;

  active: boolean;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private forms: FormService) {
    this.active = false;
    this.processing = false;
    this.subscriptions = new Array<Subscription>();
    this.onSubmitEmitter = new EventEmitter<any>();
    this.onCancelEmitter = new EventEmitter<string>();
    this.subscriptions.push(this.forms.observableFormNotification.subscribe((name: string) => {
      // this check may not be necessary
      if (this.name === name) {
        this.reset();
      }
    }));
    this.subscriptions.push(this.route.queryParams.subscribe(queryParams => {
      this.token = queryParams['token'];
    }));
  }

  private buildFormModel(): any {
    let formModel = {};
    this.inputs.forEach(input => {
      formModel[input.property] = input.value;
    });
    // add token to form model if available
    if (this.token) {
      formModel['token'] = this.token;
    }
    return formModel;
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }

  init(): void {
    this.subscriptions.push(this.forms.getInputs(this.name).subscribe((inputs: Array<FormInput>) => {
      // TODO: cache the validators with the inputs
      this.inputs = new Map<string, FormInput>();
      let formControls = {};
      for (let input of inputs) {
        formControls[input.id] = new FormControl('', Validators.compose(this.forms.createValidators(input)));
        input.value = this.data !== undefined && this.data[input.property] !== undefined ? this.data[input.property] : undefined;
        if (input.repeatable && (input.value === undefined || input.value.length == 0)) {
          if (input.value === undefined) {
            input.value = new Array<any>();
          }
        }
        this.inputs.set(input.property, input);
      }
      this.form = this.formBuilder.group(formControls);
      this.active = true;
    }, errors => {
      console.error('Error: ', errors);
    }));
  }

  reset(): void {
    this.processing = false;
    this.active = false;
    this.init();
  }

  onSubmit(): void {
    this.processing = true;
    this.onSubmitEmitter.next(this.buildFormModel());
    this.subscriptions.push(this.finishedObservable.subscribe((finished: boolean) => {
      if (finished) {
        this.processing = false;
      }
    }));
  }

  onCancel(): void {
    this.reset();
    this.onCancelEmitter.next('Cancel click');
  }

  disabled(): boolean {
    return !this.form.valid || this.processing;
  }

}
