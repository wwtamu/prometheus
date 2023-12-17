import { SidecardLink } from './sidecard-link';

export class Sidecard {

  public id: number;

  public title: string;

  public info: string;

  public custom: boolean;

  public links: Array<SidecardLink>;

  constructor(json: any) {
    this.id = json.id;
    this.title = json.title;
    this.info = json.info;
    this.custom = json.custom;
    this.links = new Array<SidecardLink>();
    json.links.forEach((json: any) => {
      this.links.push(new SidecardLink(json));
    });
  }

  private updateSidecardLink(sidecardLinkToUpdate: SidecardLink): boolean {
    let updated: boolean = false;
    for (let i = this.links.length - 1; i >= 0; i--) {
      if (this.links[i].id === sidecardLinkToUpdate.id) {
        this.links[i].destination = sidecardLinkToUpdate.destination;
        this.links[i].label = sidecardLinkToUpdate.label;
        this.links[i].icon = sidecardLinkToUpdate.icon;
        this.links[i].external = sidecardLinkToUpdate.external;
        updated = true;
        break;
      }
    }
    return updated;
  }

  private removeSidecardLink(sidecardLinkToRemove: SidecardLink): boolean {
    let removed: boolean = false;
    for (let i = this.links.length - 1; i >= 0; i--) {
      if (this.links[i].id === sidecardLinkToRemove.id) {
        this.links.splice(i, 1);
        removed = true;
        break;
      }
    }
    return removed;
  }

  addLink(link: SidecardLink): boolean {
    this.links.push(link);
    return true;
  }

  updateLink(link: SidecardLink): boolean {
    return this.updateSidecardLink(link);
  }

  removeLink(link: SidecardLink): boolean {
    return this.removeSidecardLink(link);
  }

  clearLinks(): boolean {
    this.links.length = 0;
    return true;
  }

}
