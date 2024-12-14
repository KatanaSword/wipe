import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar?: IAvatar;
  role: string[];
  isEmailVerify: boolean;
  refreshToken: string;
  forgotPasswordToken: string;
  forgotPasswordExpiry: Date;
  emailVerificationToken: string;
  emailVerificationExpiry: Date;
}

type IAvatar = {
  url: string;
  publicId: string;
};
