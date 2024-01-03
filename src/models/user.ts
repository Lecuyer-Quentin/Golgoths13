import mongoose, { Schema } from "mongoose"

//todo : add required fields

const userSchema: Schema = new Schema(
    {
        username: { type: String, unique: true },
        name: { type: String},
        lastName: { type: String},
        password: { type: String, unique: true },
        email: { type: String, unique: true },
        role: { type: String, enum: ['admin', 'editor', 'writer', 'reader', 'guest']},
        avatar: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
        {timestamps: true}
);

export interface UserModel {
    username: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

const User = mongoose.models.User || mongoose.model<UserModel>("User", userSchema);

export default User;