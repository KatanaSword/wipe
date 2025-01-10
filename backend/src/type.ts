import { Document, Types } from "mongoose";
import { Content } from "mailgen";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar?: Url;
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

export interface IScreenshot extends Document {
  _id: string;
  fileName: string;
  image: Url;
  owner: Types.ObjectId;
  aspectRatioId: Types.ObjectId;
  backgroundColorId: Types.ObjectId;
}

export interface IBlog extends Document {
  _id: string;
  fileName: string;
  summary: string;
  image: Url;
  owner: Types.ObjectId;
  aspectRatioId: Types.ObjectId;
  backgroundColorId: Types.ObjectId;
}

export interface ICode extends Document {
  _id: string;
  fileName: string;
  codeFileName: string;
  code: string;
  language: string;
  owner: Types.ObjectId;
  aspectRatioId: Types.ObjectId;
  backgroundColorId: Types.ObjectId;
}

export interface ITestimonial extends Document {
  _id: string;
  fileName: string;
  avatar: Url;
  name: string;
  stars: number;
  review: string;
  owner: Types.ObjectId;
  aspectRatioId: Types.ObjectId;
  backgroundColorId: Types.ObjectId;
}

export interface IAspectRatio extends Document {
  _id: string;
  height: number;
  width: number;
  ownerId: Types.ObjectId;
}

export interface IBackgroundColor extends Document {
  _id: string;
  backgroundColorName: string;
  colorHexCode: {
    colorOne: string;
    colorTwo: string;
  };
  ownerId: Types.ObjectId;
}

export interface IPost extends Document {
  _id: string;
  screenshots: [
    {
      screenshotId: Types.ObjectId;
    }
  ];
  blogs: [
    {
      blogId: Types.ObjectId;
    }
  ];
  codes: [
    {
      codeId: Types.ObjectId;
    }
  ];
  testimonials: [
    {
      testimonialId: Types.ObjectId;
    }
  ];
  ownerId: Types.ObjectId;
}

type Url = {
  url: string;
  publicId: string;
};

export type IOptions = {
  email: string;
  subject: string;
  mailgenClient: Content;
};
