export class Avis{

  private _id : number;
  private _commentaire : string;

  private _note : string;

  private _nom : string;

  private _status : Status


  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._commentaire = data.commentaire ? data.commentaire : null;
    this._note = data.note ? data.note : null;
    this._status = data.status ? data.status : null;
    this._nom = data.nom ? data.nom : null;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get commentaire(): string {
    return this._commentaire;
  }

  set commentaire(value: string) {
    this._commentaire = value;
  }

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get status(): Status {
    return this._status;
  }

  set status(value: Status) {
    this._status = value;
  }

  serialize(){
    return {
      id: this.id,
      commentaire : this.commentaire,
      note: this.note,
      nom: this.nom
    }
  }
}

export enum Status{
  VALIDE,
  EN_ATTENTE,
  REJETE
}
