import { Schema, model } from 'mongoose';
import User from './User';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<User>('User', UserSchema);
