export class Option{

  private _id : number;

  private _nom : string;

  private _description : string;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._nom = data.nom ? data.nom : null;
    this._description = data.description ? data.description : null;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  serialize() {
    return {
      id: this.id ? this.id : null,
      description : this.description ? this.description : '',
      nom : this.nom ? this.nom : ''
    }
  }
}
