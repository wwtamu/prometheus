import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { FormInput } from '../form-input';
import { FormAlternateInput } from '../form-alternate-input';

import { FormFieldOption } from './form-field-option';

@Component({
  selector: 'prometheus-form-field',
  styleUrls: ['form-field.component.css'],
  templateUrl: 'form-field.component.html'
})
export class FormFieldComponent implements OnInit {

  @Input() inputs: Map<string, FormInput>;

  @Input() input: FormInput;

  @Input() form: FormGroup;

  private collections: Array<string>;

  typeSubject: BehaviorSubject<string>;

  optionsSubject: BehaviorSubject<Array<FormFieldOption>>;

  constructor() {
    this.collections = ['SELECT'];
  }

  ngOnInit() {
    this.typeSubject = new BehaviorSubject(this.input.type);
    this.optionsSubject = new BehaviorSubject(this.input.select.options);
  }

  // TODO: reset form when type changed
  resolveInputType(): string {
    this.input.alternateFormInputs.forEach((alternateInput: FormAlternateInput) => {
      let input: FormInput = this.inputs.get(alternateInput.property);
      if (alternateInput.property === input.property) {
        if (alternateInput.value === input.value.toString()) {
          this.typeSubject.next(alternateInput.type);
          this.optionsSubject.next(alternateInput.select.options);
        }
        else {
          this.typeSubject.next(this.input.type);
          this.optionsSubject.next(this.input.select.options);
        }
      }
    });
    return this.typeSubject.getValue();
  }

  toggleCheckbox(): void {
    this.input.value = this.input.value ? false : true;
  }

  isSuccess(): boolean {
    return this.form.controls[this.input.id].valid && !this.form.controls[this.input.id].pristine;
  }

  isWarning(): boolean {
    return !this.form.controls[this.input.id].valid && !this.form.controls[this.input.id].pristine;
  }

  // TODO: use when server responds with an error
  isDanger(): boolean {
    return false;
  }

  showLabel(): boolean {
    return this.input.type !== 'HIDDEN';
  }

  showValidationMessage(): boolean {
    return !this.form.controls[this.input.id].valid && !this.form.controls[this.input.id].pristine;
  }

  minLengthError(): boolean {
    return this.form.controls[this.input.id].errors && this.form.controls[this.input.id].errors['minlength'];
  }

  maxLengthError(): boolean {
    return this.form.controls[this.input.id].errors && this.form.controls[this.input.id].errors['maxlength'];
  }

  patternError(): boolean {
    return this.form.controls[this.input.id].errors && this.form.controls[this.input.id].errors['pattern'];
  }

  requiredError(): boolean {
    return this.form.controls[this.input.id].errors && this.form.controls[this.input.id].errors['required'];
  }

  toLowerCase(value: string): string {
    return value.toLowerCase();
  }

}
