import { Role } from './role';
import { Application } from './application';

export class Authority {

  private _id: number;

  private _role: Role;

  private _scope: Array<Application>;

  constructor(json: any) {
    this.id = json.id;
    this.role = <Role>Role[<string>json.role];
    this.scope = new Array<Application>();
    json.scope.forEach((scope: any) => {
      this.scope.push(new Application(scope));
    });
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get role(): Role {
    return this._role;
  }

  set role(role: Role) {
    this._role = role;
  }

  get scope(): Array<Application> {
    return this._scope;
  }

  set scope(scope: Array<Application>) {
    this._scope = scope;
  }

}
