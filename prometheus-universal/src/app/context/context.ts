
export class Context {

  private _key: string;

  private _name: string;

  private _path: string;

  constructor(path: string) {
    this.path = path;
    this.key = this.pathToKey(this.path);
    this.name = this.keyToName(this.key);
  }

  private pathToKey(path: string): string {
    let parts: Array<string> = path.split('/');
    return parts[parts.length - 1];
  }

  private keyToName(key: string): string {
    return this.capitalizeFirstCharacter(key);
  }

  private capitalizeFirstCharacter(value: string): string {
    return value.charAt(0).toUpperCase() + value.substring(1, value.length);
  }

  get key(): string {
    return this._key;
  }

  set key(key: string) {
    this._key = key;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get path(): string {
    return this._path;
  }

  set path(path: string) {
    this._path = path;
  }

}
