export class User{
  id : number;
  username : string;
  roles : Array<string>;
  accessToken : string;

  constructor(data : any){
    this.id = data.id ? data.id : null;
    this.username = data.username ? data.username : null;
    this.roles = data.roles ? data.roles : null;
    this.accessToken = data.accessToken ? data.accessToken : null;
  }

  public serialize() {
    return {
      id: this.id,
      username: this.username,
      roles: this.roles,
      accessToken: this.accessToken
    };
  }
}
export class UserAuthenticate{
  password : string;
  username : string;

  constructor(data : any){
    this.password = data.password ? data.password : null;
    this.username = data.username ? data.username : null;
  }

  public serialize() {
    return {
      password: this.password,
      username: this.username
    };
  }
}

export class UserCreate{
  username : string;
  password : string;
  role: Array<string>;

  constructor(data : any){
    this.username = data.username ? data.username : null;
    this.password = data.password ? data.password : null;
    this.role = data.role ? data.role : null;
  }

  public serialize() {
    return {
      username: this.username,
      password: this.password,
      role: this.role
    };
  }
}

export class UserDTO{
  id : number;
  username : string;

  constructor(data : any){
    this.id = data.id ? data.id : null;
    this.username = data.username ? data.username : null;
  }

  public serialize() {
    return {
      id: this.id,
      username: this.username
    };
  }
}
