import mongoose from 'mongoose';
import { ROLES } from "./Permissions";
const { model, Schema } = mongoose;

// Mongoose schemas are separate from TypeScript interfaces, so you need to define both a document interface and a schema.

export interface IUser {
    _id?: string, // assigned by MongoDB
    created_at?: Date,
    googleId: string,
    displayName: string,
    email: string,
    role: string,
}

// do we want an auto-assigned _id or should email serve as a unique identifier?
// https://stackoverflow.com/questions/10352900/mongoose-how-to-set-a-schema-field-to-be-the-id
const userSchema = new Schema<IUser>({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ROLES, required: true},
    created_at: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema, "users");
export default User;
