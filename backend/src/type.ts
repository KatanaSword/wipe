import { Document, Types } from "mongoose";
import { Content } from "mailgen";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar?: IUrl;
  role: string;
  phoneNumber?: number;
  countryCode?: string;
  fullName?: string;
  isEmailVerify: boolean;
  refreshToken: string;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  generateTemporaryToken(): {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: Date;
  };
}

export interface IPost extends Document {
  _id: string;
  name: string;
  image?: IUrl;
  video?: IUrl;
  content: string;
  creator: Types.ObjectId;
  canvasId: Types.ObjectId;
}

export interface ICanvas extends Document {
  _id: string;
  height: number;
  width: number;
  color: string;
}

type IUrl = {
  url: string;
  publicId: string;
};

export type IOptions = {
  email: string;
  subject: string;
  mailgenClient: Content;
};
