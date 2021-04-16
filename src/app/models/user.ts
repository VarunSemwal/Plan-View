export class User {
    id: number;
    useremail: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

export class UserDetail {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateofbirth:any;
    addressLine1: string;
    addressLine2: string;
    city:string;
    state:string;
    country:string;
    zipcode:any;
    role:string;
    lockstatus:number;
    retryCount:number;
    id:number;
}