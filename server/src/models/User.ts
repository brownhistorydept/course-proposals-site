import mongoose from 'mongoose';
import IRole = require("./Roles");
const { model, Schema } = mongoose;

// Mongoose schemas are separate from TypeScript interfaces, so you need to define both a document interface and a schema.

interface IUser {
    name: String,
    email:   String,
    role: IRole,
    created_at: Date,
}

const userSchema = new Schema({
    _id:  String, // do we want this? check this out: https://stackoverflow.com/questions/10352900/mongoose-how-to-set-a-schema-field-to-be-the-id
    name: String,
    email:   String,
    role:  { type: Schema.Types.ObjectId, ref: "Role", required: true },
    created_at: { type: Date, default: Date.now },
});

var User = model<IUser>("Role", userSchema);
export = IUser; 