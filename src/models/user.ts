import mongoose, { Schema } from "mongoose"

const userSchema: Schema = new Schema(
    {
        username: { type: String, unique: true , default: 'User'},
        name: { type: String, default: ''},
        lastName: { type: String, default: ''},
        password: { type: String, unique: true },
        email: { type: String, unique: true },
        role: { type: String, enum: ['admin', 'editor', 'writer', 'user', 'guest'], default: 'guest' },
        avatar: { type: String , default: 'https://res.cloudinary.com/dkkgmzpqd/image/upload/v1627668859/avatars/default-avatar.png'},
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