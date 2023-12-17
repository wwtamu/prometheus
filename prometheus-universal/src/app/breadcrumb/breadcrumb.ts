
export class Breadcrumb {

  private _label: string;

  private _link: string;

  private _level: number;

  constructor(label: string, link: string, level: number) {
    this._label = label;
    this._link = link;
    this._level = level;
  }

  get label(): string {
    return this._label;
  }

  set label(label: string) {
    this._label = label;
  }

  get link(): string {
    return this._link;
  }

  set link(link: string) {
    this._link = link;
  }

  get level(): number {
    return this._level;
  }

  set level(level: number) {
    this._level = level;
  }

}
