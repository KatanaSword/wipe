import { Document } from "mongoose";
import { Content } from "mailgen";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar?: IAvatar;
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

type IAvatar = {
  url: string;
  publicId: string;
};

export type IOptions = {
  email: string;
  subject: string;
  mailgenClient: Content;
};
