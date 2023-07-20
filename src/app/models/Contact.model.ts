export class Contact{
    title : string;
    name : string;
    firstname : string;
    mail : string;
    phone : string;
    description : string;

    constructor(data : any){
        this.title = data.title;
        this.name = data.name;
        this.firstname = data.firstname;
        this.mail = data.mail;
        this.phone = data.phone;
        this.description = data.description;
    }


}
