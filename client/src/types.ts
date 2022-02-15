
// import IRole = require("./Roles");

export interface IUser {
    _id?: string, // assigned by MongoDB
    googleId: string,
    displayName: string,
    email: string,
    // role: IRole,
    created_at?: Date,
}