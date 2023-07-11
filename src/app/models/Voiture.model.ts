export class Voiture{


  //attributs
  private _id : number;
  private _annee_circulation : number;
  private _energie : string;
  private _kilometre : number;
  private _prix : number;
  private _description : string;
  private _denomination : string;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._annee_circulation = data.annee_circulation ? data.annee_circulation : null;
    this._energie = data.energie ? data.energie : null;
    this._kilometre = data.kilometre ? data.kilometre : null;
    this._prix = data.prix ? data.prix : null;
    this._description = data.description ? data.description : null;
    this._denomination = data.denomination ? data.denomination : null;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get annee_circulation(): number {
    return this._annee_circulation;
  }

  set annee_circulation(value: number) {
    this._annee_circulation = value;
  }

  get energie(): string {
    return this._energie;
  }

  set energie(value: string) {
    this._energie = value;
  }

  get kilometre(): number {
    return this._kilometre;
  }

  set kilometre(value: number) {
    this._kilometre = value;
  }

  get prix(): number {
    return this._prix;
  }

  set prix(value: number) {
    this._prix = value;
  }

  get denomination(): string {
    return this._denomination;
  }

  set denomination(value: string) {
    this._denomination = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  serialize(){
    return {
      id : this._id,
      denomination : this._denomination,
      prix : this._prix,
      description : this._description,
      energie : this._energie,
      annee_circulation : this._annee_circulation
    }
  }

}
