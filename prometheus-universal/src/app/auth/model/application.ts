
export class Application {

  private _id: number;

  private _name: string;

  private _description: string;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

}
