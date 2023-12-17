import { FormSelect } from './form-select';
import { FormAlternateInput } from './form-alternate-input';

export class FormInput {

  private _type: string;

  private _property: string;

  private _label: string;

  private _value: any;

  private _repeatable: boolean;

  private _repeat: number;

  private _validations: any;

  private _edit: boolean;

  private _hidden: boolean;

  private _select: FormSelect;

  private _alternateFormInputs: Array<FormAlternateInput>;

  constructor(json: any) {
    this.type = json.type;
    this.property = json.property;
    this.label = json.label;
    this.value = json.default;
    this.repeatable = json.repeatable;
    this.repeat = json.repeat;
    this.validations = json.validations;
    this.edit = json.edit;
    this.hidden = json.hidden;
    this.select = new FormSelect(json.select);
    this.alternateFormInputs = new Array<FormAlternateInput>();
    if (json.alternateFormInputs) {
      json.alternateFormInputs.forEach(json => {
        this.alternateFormInputs.push(new FormAlternateInput(json));
      });
    }
  }

  get id(): string {
    return this.repeat ? [this.property, this.repeat].join('.') : this.property;
  }

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  get property(): string {
    return this._property;
  }

  set property(property: string) {
    this._property = property;
  }

  get label(): string {
    return this._label;
  }

  set label(label: string) {
    this._label = label;
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  get repeatable(): boolean {
    return this._repeatable;
  }

  set repeatable(repeatable: boolean) {
    this._repeatable = repeatable;
  }

  get repeat(): number {
    return this._repeat;
  }

  set repeat(repeat: number) {
    this._repeat = repeat;
  }

  get validations(): any {
    return this._validations;
  }

  set validations(validations: any) {
    this._validations = validations;
  }

  get edit(): boolean {
    return this._edit;
  }

  set edit(edit: boolean) {
    this._edit = edit;
  }

  get hidden(): boolean {
    return this._hidden;
  }

  set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  get select(): FormSelect {
    return this._select;
  }

  set select(select: FormSelect) {
    this._select = select;
  }

  get alternateFormInputs(): Array<FormAlternateInput> {
    return this._alternateFormInputs;
  }

  set alternateFormInputs(alternateFormInputs: Array<FormAlternateInput>) {
    this._alternateFormInputs = alternateFormInputs;
  }

}
