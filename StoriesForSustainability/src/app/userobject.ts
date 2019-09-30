export class UserObject {
    name: string; // string representing a user's full name
    email: string; // string representing a user's email (use this for requests)
    _id: string; // mongoID

    constructor(name:string, email:string, _id:string) {
        this.name = name;
        this.email = email;
        this._id = _id;
    }
}