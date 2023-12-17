
export class SidecardLink {

  public id: number;

  public label: string;

  public destination: string;

  public icon: string;

  public external: boolean;

  constructor(json: any) {
    this.id = json.id;
    this.label = json.label;
    this.destination = json.destination;
    this.icon = json.icon;
    this.external = json.external;
  }

}
