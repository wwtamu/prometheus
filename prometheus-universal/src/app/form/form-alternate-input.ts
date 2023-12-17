import { FormSelect } from './form-select';

export class FormAlternateInput {

  private _type: string;

  private _property: string;

  private _value: string;

  private _select: FormSelect;

  constructor(json: any) {
    this.type = json.type;
    this.property = json.property;
    this.value = json.value;
    this.select = new FormSelect(json.select);
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

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get select(): FormSelect {
    return this._select;
  }

  set select(select: FormSelect) {
    this._select = select;
  }

}
