import { Inject, Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

import { CacheService } from '../core/cache.service';
import { RestService } from '../core/rest.service';
import { FormOptionsResolverService } from './form-options-resolver.service';
import { FormInput } from './form-input';
import { FormFieldOption } from './field/form-field-option';

@Injectable()
export class FormService {

  private CACHE_PREFIX: string = "FORM";

  private formStore: Map<string, Array<FormInput>>;

  private formNotificationSubject: BehaviorSubject<any>;

  constructor(private cache: CacheService, private rest: RestService, private options: FormOptionsResolverService, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.formStore = new Map<string, Array<FormInput>>();
    this.formNotificationSubject = BehaviorSubject.create();
  }

  private cacheKey(name): string {
    return [this.CACHE_PREFIX, '-', name].join('');;
  }

  private fetchInputs(name: string, observer: any): void {
    let inputs: Array<FormInput> = new Array<FormInput>();
    // fetch the inputs
    this.rest.get({
      url: this.config.FORM[name]
    }).subscribe((response: any) => {
      // cache the json representation
      this.cache.set(this.cacheKey(name), response);
      inputs = this.jsonToFormInputs(response);
      this.formStore.set(name, inputs);
      observer.next(inputs);
      observer.complete();
    });
  }

  private jsonToFormInputs(json: any): Array<FormInput> {
    let inputs: Array<FormInput> = new Array<FormInput>();
    for (let input of json) {
      for (let alternateInput of input.alternateFormInputs) {
        if (alternateInput.select.optionType === 'CLIENT') {
          alternateInput.select.options = this.options.resolve(alternateInput.select.optionReference);
        }
      }
      if (input.select.optionType === 'CLIENT') {
        input.select.options = this.options.resolve(input.select.optionReference);
      }
      inputs.push(new FormInput(input));
    }
    return inputs;
  }

  getInputs(name: string): Observable<Array<FormInput>> {
    return Observable.create(observer => {
      let inputs: Array<FormInput> = new Array<FormInput>();
      // check the local store for the inputs
      inputs = this.formStore.get(name);
      if (inputs) {
        observer.next(inputs);
        observer.complete();
      }
      else {
        // check the cache for the inputs
        let cachedInputs = this.cache.get(this.cacheKey(name));
        if (cachedInputs) {
          inputs = this.jsonToFormInputs(cachedInputs);
          this.formStore.set(name, inputs);
          observer.next(inputs);
          observer.complete();
        }
        else {
          // fetch the inputs
          this.fetchInputs(name, observer);
        }
      }
    });
  }

  createValidators(input: FormInput): Array<any> {
    let validators: Array<any> = new Array<any>();
    for (let key in input.validations) {
      if (key === 'required') {
        if (input.validations[key] && input.validations[key].value) {
          validators.push(Validators.required);
        }
      }
      else {
        validators.push(Validators[key](input.validations[key].value));
      }
    }
    return validators;
  }

  notify(name: string): void {
    this.formNotificationSubject.next(name);
  }

  get observableFormNotification(): Observable<any> {
    return this.formNotificationSubject.asObservable();
  }

}
