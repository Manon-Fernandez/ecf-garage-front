export class Option{

  private _id : number;

  private _nom : string;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._nom = data.nom ? data.nom : null;
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


  serialize() {
    return {
      id: this.id ? this.id : null,
      nom : this.nom ? this.nom : ''
    }
  }
}
