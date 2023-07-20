export class Service{


  private _id : number;

  private _nom : string;

  private _description : string;

  private _image : string;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._nom = data.nom ? data.nom : '';
    this._description = data.description ? data.description : '';
    this._image = data.image ? data.image : '';

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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  serialize(){
    return {
      id: this._id,
      image : this._image,
      description: this._description,
      nom : this._nom
    }
  }
}
