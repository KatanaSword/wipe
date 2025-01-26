import { User } from "../models/user.model";
import { JwtPayload } from "../type";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req: Request, _, next: NextFunction) => {
  try {
    const token: string =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(401, "Missing or invalid access token");
    }
    // verify a token symmetric - synchronous
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECURE!
    ) as JwtPayload;
    if (!decodedToken) {
      throw new ApiError(401, "Missing or invalid token");
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Missing or invalid access token");
  }
});

const verifyPermission = (roles: string[] = []): any => {
  return asyncHandler(async (req: Request, _, next: NextFunction) => {
    if (!req.user._id) {
      throw new ApiError(401, "Unauthorized request");
    }
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      throw new ApiError(403, "You are not authorized to perform this action");
    }
  });
};

export { verifyJWT, verifyPermission };
