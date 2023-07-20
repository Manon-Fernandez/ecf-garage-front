import {Image} from "./Image.model";
import {Option} from "./Option.model";

export class Voiture{

  //attributs
  private _id : number;
  private _annee_circulation : number;
  private _energie : Energie;
  private _kilometre : number;
  private _prix : number;
  private _description : string;
  private _denomination : string;
  private _images : Array<Image> = [];
  private _options : Array<Option> = [];

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._annee_circulation = data.annee_circulation ? data.annee_circulation : null;
    this._energie = data.energie ? data.energie : null;
    this._kilometre = data.kilometre ? data.kilometre : null;
    this._prix = data.prix ? data.prix : null;
    this._description = data.description ? data.description : null;
    this._denomination = data.denomination ? data.denomination : null;
    if(data.images){
      data.images.forEach((imageData: any) => {
        this._images.push(new Image(imageData));
      });
    }
    if(data.options){
      data.options.forEach((optionData: any) => {
        this._options.push(new Option(optionData));
      });
    }
  }

  get options(): Array<Option> {
    return this._options;
  }

  set options(value: Array<Option>) {
    this._options = value;
  }

  get images(): Array<Image> {
    return this._images;
  }

  set images(value: Array<Image>) {
    this._images = value;
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

  get energie(): Energie {
    return this._energie;
  }

  set energie(value: Energie) {
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
      annee_circulation : this._annee_circulation,
      images : this._images,
      kilometre: this._kilometre,
      options: this._options.map(option => option.serialize())
    }
  }

}
export enum Energie{
  ELECTRIQUE = 'Electrique',
  DIESEL = 'Diesel',
  ESSENCE = 'Essence',
  GPL = 'GPL'
}
