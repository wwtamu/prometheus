
export class FormFieldOption {

  private _gloss: string;

  private _value: any;

  constructor(json: any) {
    this.gloss = json.gloss;
    this.value = json.value;
  }

  get gloss(): string {
    return this._gloss;
  }

  set gloss(gloss: string) {
    this._gloss = gloss;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

}
