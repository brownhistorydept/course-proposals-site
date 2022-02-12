import mongoose from 'mongoose';
import IRole = require("./Roles");
const { model, Schema } = mongoose;

// Mongoose schemas are separate from TypeScript interfaces, so you need to define both a document interface and a schema.

export interface IUser {
    googleId: string
    displayName: string,
    email:   string,
    // role: IRole,
    created_at?: Date,
}

const userSchema = new Schema({
    googleId:  String, // do we want this? check this out: https://stackoverflow.com/questions/10352900/mongoose-how-to-set-a-schema-field-to-be-the-id
    displayName: String,
    email:   String,
    // role:  { type: Schema.Types.ObjectId, ref: "Role", required: true },
    created_at: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema);
export default User;