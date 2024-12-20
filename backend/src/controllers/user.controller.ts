import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  accountDetailUpdateSchema,
  assignRoleSchema,
  tokenSchema,
  userRegisterSchema,
  userSignInSchema,
} from "../validations/schemas/user.schema";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { options, userRoleEnum } from "../constants";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

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

const accountDetailUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = accountDetailUpdateSchema.safeParse(req.body);
    const errorMessage = parserData.error?.issues.map((issue) => issue.message);
    if (!parserData.success) {
      throw new ApiError(400, "", errorMessage);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          phoneNumber: parserData.data.phoneNumber,
          countryCode: parserData.data.countryCode,
          fullName: parserData.data.fullName,
        },
      },
      { new: true }
    ).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(500, "Account update failed, Please try again later.");
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "Account update successfully"));
  }
);

const avatarUpdate = asyncHandler(async (req: Request, res: Response) => {
  const parserData = avatarUpdateSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: {
          url,
          publicId,
        },
      },
    },
    { new: true }
  ).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(500, "Update avatar failed, Please try again later.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "Update avatar successfully"));
});

const accessRefreshToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Missing or invalid refresh token");
    }

    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECURE!
    );
    if (!decodeToken) {
      throw new ApiError(401, "Missing or invalid refresh token");
    }

    const user = await User.findById(decodeToken._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Missing or invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access and refresh tokens generated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      "Refresh token mismatch. Please reauthenticate to obtain a new access token"
    );
  }
});

const assignRole = asyncHandler(async (req: Request, res: Response) => {
  const parserData = assignRoleSchema.safeParse(req.body);
  const parserToken = tokenSchema.safeParse(req.params);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty");
  }

  const user = await User.findById(parserToken.data?.userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.role = parserData.data.role;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, {}, "Assign role successfully"));
});

export {
  userRegister,
  userSignIn,
  userSignOut,
  getCurrentUser,
  accountDetailUpdate,
  avatarUpdate,
  accessRefreshToken,
  assignRole,
};
