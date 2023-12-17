
export class Notification {

  private _timestamp: number;

  private _id: number;

  private _type: string;

  private _i18n: string;

  private _data: any;

  private _message: string;

  private _duration: number;

  private _routeChanges: number;

  constructor(json: any) {
    var date = new Date();
    this.timestamp = date.getTime();
    this.id = this.timestamp + Math.floor(Math.random() * 10000);
    this.type = json.type;
    this.i18n = json.i18n;
    this.data = json.data;
    if (json.modifier) {
      if (json.modifier.type === 'DURATION') {
        this.duration = json.modifier.value * 1000;
      }
      else {
        this.routeChanges = json.modifier.value;
      }
    }
  }

  get timestamp(): number {
    return this._timestamp;
  }

  set timestamp(timestamp: number) {
    this._timestamp = timestamp;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type.toLowerCase();
  }

  get i18n(): string {
    return this._i18n;
  }

  set i18n(i18n: string) {
    this._i18n = i18n;
  }

  get data(): any {
    return this._data;
  }

  set data(data: any) {
    this._data = data;
  }

  get message(): string {
    return this._message;
  }

  set message(message: string) {
    this._message = message;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(duration: number) {
    this._duration = duration;
  }

  get routeChanges(): number {
    return this._routeChanges;
  }

  set routeChanges(routeChanges: number) {
    this._routeChanges = routeChanges;
  }

}
