import { Role } from './app/auth/model/role';

export class Route {

  private _path: string;

  private _role: Role;

  constructor(path: string, role: Role) {
    this.path = path;
    this.role = role;
  }

  get path(): string {
    return this._path;
  }

  set path(path: string) {
    this._path = path;
  }

  get role(): Role {
    return this._role;
  }

  set role(role: Role) {
    this._role = role;
  }

}
