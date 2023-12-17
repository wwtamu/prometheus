import { Context } from '../context/context';
import { Sidecard } from './sidecard/sidecard';

export class Sidebar {

  public id: number;

  public name: string;

  public username: string;

  public defaultSidecards: Array<Sidecard>;

  public customSidecards: Array<Sidecard>;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.username = json.username;
    this.defaultSidecards = new Array<Sidecard>();
    json.defaultSidecards.forEach((sidecard: any) => {
      this.defaultSidecards.push(new Sidecard(sidecard));
    });
    this.customSidecards = new Array<Sidecard>();
    json.customSidecards.forEach((sidecard: any) => {
      this.customSidecards.push(new Sidecard(sidecard));
    });
  }

  get sidecards(): Array<Sidecard> {
    return this.defaultSidecards.concat(this.customSidecards);
  }

  addDefaultSidecard(sidecard: Sidecard): boolean {
    this.defaultSidecards.push(sidecard);
    return true;
  }

  addCustomSidecard(sidecard: Sidecard): boolean {
    this.customSidecards.push(sidecard);
    return true;
  }

  removeSidecard(sidecard: Sidecard): boolean {
    let removed: boolean = this.removeDefaultSidecard(sidecard);
    if (!removed) {
      removed = this.removeCustomSidecard(sidecard);
    }
    return removed;
  }

  removeDefaultSidecard(sidecard: Sidecard): boolean {
    let removed: boolean = false;
    for (let i = this.defaultSidecards.length - 1; i >= 0; i--) {
      if (this.defaultSidecards[i].id === sidecard.id) {
        this.defaultSidecards.splice(i, 1);
        removed = true;
        break;
      }
    }
    return removed;
  }

  removeCustomSidecard(sidecard: Sidecard): boolean {
    let removed: boolean = false;
    for (let i = this.customSidecards.length - 1; i >= 0; i--) {
      if (this.customSidecards[i].id === sidecard.id) {
        this.customSidecards.splice(i, 1);
        removed = true;
        break;
      }
    }
    return removed;
  }

  updateSidecard(sidecard: Sidecard): boolean {
    let replaced: boolean = false;
    for (let i = this.sidecards.length - 1; i >= 0; i--) {
      if (this.sidecards[i].id === sidecard.id) {
        this.sidecards[i].title = sidecard.title;
        this.sidecards[i].info = sidecard.info;
        replaced = true;
        break;
      }
    }
    return replaced;
  }

}
