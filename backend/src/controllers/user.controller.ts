import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { userRegisterSchema } from "../validations/schemas/user.schema";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { userRoleEnum } from "../constants";
import { ApiResponse } from "../utils/ApiResponse";

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  const parserData = userRegisterSchema.safeParse(req.body);
  console.log("ParserData:", parserData);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  console.log("ErrorMessage:", errorMessage);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const userExist = await User.findOne({
    $or: [
      { username: parserData.data.username },
      { email: parserData.data.email },
    ],
  });
  console.log("UserExist:", userExist);
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
  console.log("User:", user);
  if (!user) {
    throw new ApiError(500, "Failed to create user. Please try again later");
  }

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log("UserCreated:", userCreated);
  if (!userCreated) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, { user: userCreated }, "User register successfully")
    );
});

export { userRegister };
