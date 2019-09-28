export class UserObject {
    username: string; // string representing a user's username
    email: string; // string representing a user's email
    givenName: string; // string representing a user's first name
    displayName: string; // string representing a user's name in "Last, First" format

    constructor(username:string, email:string, givenName:string, displayName:string) {
        this.username = username;
        this.email = email;
        this.givenName = givenName;
        this.displayName = displayName;
    }
}