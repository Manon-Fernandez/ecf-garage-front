export class Image{

  private _id: number;
  private _imagesBytes: string;
  private _isPrincipal: boolean;

  constructor(data : any) {
    this._id = data.id ? data.id : null;
    this._imagesBytes = data.imageBytes ? data.imageBytes : '';
    this._isPrincipal = data.isPrincipal ? data.isPrincipal : false;
  }


  get isFirst(): boolean {
    return this._isPrincipal;
  }

  set isFirst(value: boolean) {
    this._isPrincipal = value;
  }

  get imageBytes(): string {
    return this._imagesBytes;
  }

  set imageBytes(value: string) {
    this._imagesBytes = value;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
