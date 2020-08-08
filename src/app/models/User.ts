import mongoose from 'mongoose'

export type UserDocument = mongoose.Document & {
    userId: number;
    distance: number;
    date: string;
}

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    distance: { type: Number, required: true },
    date: { type: Date, default: new Date() }
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("users", userSchema);