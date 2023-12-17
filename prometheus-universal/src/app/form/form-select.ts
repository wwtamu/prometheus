import { FormFieldOption } from './field/form-field-option';

export class FormSelect {

  private _optionType: string;

  private _optionProperty: string;

  private _optionReference: string;

  private _options: Array<FormFieldOption>;

  constructor(json: any) {
    this.optionType = json.optionType;
    this.optionProperty = json.optionProperty;
    this.optionReference = json.optionReference;
    this.options = new Array<FormFieldOption>();
    if (json.options) {
      json.options.forEach(json => {
        this.options.push(new FormFieldOption(json));
      });
    }
  }

  get optionType(): string {
    return this._optionType;
  }

  set optionType(optionType: string) {
    this._optionType = optionType;
  }

  get optionProperty(): string {
    return this._optionProperty;
  }

  set optionProperty(optionProperty: string) {
    this._optionProperty = optionProperty;
  }

  get optionReference(): string {
    return this._optionReference;
  }

  set optionReference(optionReference: string) {
    this._optionReference = optionReference;
  }

  get options(): Array<FormFieldOption> {
    return this._options;
  }

  set options(options: Array<FormFieldOption>) {
    this._options = options;
  }

}
