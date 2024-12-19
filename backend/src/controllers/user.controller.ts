import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  userRegisterSchema,
  userSignInSchema,
} from "../validations/schemas/user.schema";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { options, userRoleEnum } from "../constants";
import { ApiResponse } from "../utils/ApiResponse";

const generateAccessAndRefreshToken = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken: string = user.generateAccessToken();
    const refreshToken: string = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to generate access and refresh tokens. Please try again later"
    );
  }
};

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  const parserData = userRegisterSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const userExist = await User.findOne({
    $or: [
      { username: parserData.data.username },
      { email: parserData.data.email },
    ],
  });
  if (userExist) {
    throw new ApiError(
      409,
      "User already exist, use another username and email."
    );
  }

  const user = await User.create({
    username: parserData.data.username,
    email: parserData.data.email,
    password: parserData.data.password,
    role: parserData.data.role || userRoleEnum.USER,
  });
  if (!user) {
    throw new ApiError(500, "Failed to create user. Please try again later");
  }

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!userCreated) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, { user: userCreated }, "User register successfully")
    );
});

const userSignIn = asyncHandler(async (req: Request, res: Response) => {
  const parserData = userSignInSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const user = await User.findOne({
    $or: [
      { username: parserData.data.username },
      { email: parserData.data.email },
    ],
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid: boolean = await user.isPasswordCorrect(
    parserData.data.password
  );
  if (!isPasswordValid) {
    throw new ApiError(401, "Password is invalid. Please try again");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const userSignedIn = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!userSignedIn) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: userSignedIn, accessToken, refreshToken },
        "User sign in successfully"
      )
    );
});

const userSignOut = asyncHandler(async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User sign out successfully"));
  } catch (error) {
    throw new ApiError(500, "Sign out failed. Please try again later.");
  }
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, req.user, "Fetch a current user"));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch user. Please try again later.");
  }
});

export { userRegister, userSignIn, userSignOut, getCurrentUser };
