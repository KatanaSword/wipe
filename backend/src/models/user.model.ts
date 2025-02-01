import { Schema, model } from "mongoose";
import { IUser } from "../type";
import {
  availableUserRole,
  USER_TEMPORARY_TOKEN_EXPIRY,
  userRoleEnum,
} from "../constants";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { number } from "zod";

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      index: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
      unique: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: {
        url: String,
        publicId: String,
      },
      default: {
        url: "",
        publicId: "",
      },
    },
    role: {
      type: String,
      enum: availableUserRole,
      default: userRoleEnum.USER,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    countryCode: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 4,
    },
    fullName: {
      type: String,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// To hash a password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

// To check a password
userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  const user = this as IUser;
  return await bcrypt.compare(password, user.password);
};

// To generate a token
userSchema.methods.generateAccessToken = function () {
  const user = this as IUser;
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECURE!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE! }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const user = this as IUser;
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_SECURE!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE! }
  );
};

userSchema.methods.generateTemporaryToken = function (): {
  unHashedToken: string;
  hashedToken: string;
  tokenExpiry: number;
} {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = model<IUser>("User", userSchema);
