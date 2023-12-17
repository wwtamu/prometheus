import { Authority } from './authority';
import { Role } from './role';

export class User {

  private _id: number;

  private _username: string;

  private _firstName: string;

  private _lastName: string;

  private _email: string;

  private _authorities: Array<Authority>;

  constructor(json: any) {
    this.id = json.id;
    this.username = json.username;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.authorities = new Array<Authority>();
    json.authorities.forEach((authority: any) => {
      this.authorities.push(new Authority(authority));
    });
  }

  hasPermission(role: Role): boolean {
    let hasPermission: boolean = false;
    if (this.authorities) {
      this.authorities.forEach((authority: Authority) => {
        if (authority.role >= role) {
          hasPermission = true;
        }
      });
    }
    return hasPermission;
  }

  isAnonymous(): boolean {
    let isAnonymous: boolean = false;
    if (this.authorities) {
      this.authorities.forEach((authority: Authority) => {
        if (authority.role === Role.ROLE_ANONYMOUS) {
          isAnonymous = true;
        }
      });
    }
    return isAnonymous;
  }

  isAdmin(): boolean {
    let isAdmin: boolean = false;
    if (this.authorities) {
      this.authorities.forEach((authority: Authority) => {
        if (authority.role === Role.ROLE_ADMIN) {
          isAdmin = true;
        }
      });
    }
    return isAdmin;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get authorities(): Array<Authority> {
    return this._authorities;
  }

  set authorities(authorities: Array<Authority>) {
    this._authorities = authorities;
  }

}
