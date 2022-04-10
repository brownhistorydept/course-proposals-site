import mongoose from 'mongoose';
import { ROLES } from "./Permissions";
const { model, Schema } = mongoose;

// Mongoose schemas are separate from TypeScript interfaces, so you need to define both a document interface and a schema.

export interface IUser {
    _id?: string,
    created_at?: Date,
    googleId: string,
    displayName: string,
    email: string,
    displayPictureURL: string,
    role: string,
}

const userSchema = new Schema<IUser>({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), required: true},
    displayPictureURL: { type: String, required: true},
    created_at: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema, "users");
export default User;
