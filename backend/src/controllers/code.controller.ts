import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { createCodeSchema } from "../validations/schemas/code.schema";
import { ApiError } from "../utils/ApiError";
import { Code } from "../models/code.model";
import { AspectRatio } from "../models/aspectRatio.model";
import { BackgroundColor } from "../models/backgroundColor.model";
import { ApiResponse } from "../utils/ApiResponse";

const createCode = asyncHandler(async (req: Request, res: Response) => {
  const parserData = createCodeSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const fileNameExist = await Code.findOne({
    fileName: parserData.data.fileName,
  });
  if (fileNameExist) {
    throw new ApiError(409, "File name already exist, try another other name");
  }

  const aspectRatioToBeAdded = await AspectRatio.findOne({
    aspectRatioId: parserData.data.aspectRatioId,
  });
  if (!aspectRatioToBeAdded) {
    throw new ApiError(404, "Aspect ratio not found");
  }

  const backgroundColorId = await BackgroundColor.findOne({
    backgroundColorId: parserData.data.backgroundColorId,
  });
  if (!backgroundColorId) {
    throw new ApiError(404, "Background color not found");
  }

  const code = await Code.create({
    fileName: parserData.data.fileName,
    codeFileName: parserData.data.codeFileName,
    code: parserData.data.code,
    language: parserData.data.language,
    owner: req.user._id,
    aspectRatioId: parserData.data.aspectRatioId,
    backgroundColorId: parserData.data.backgroundColorId,
  });
  if (!code) {
    throw new ApiError(
      500,
      "Failed to create code post. Please try again later"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, code, "Code post create successfully"));
});

export { createCode };
