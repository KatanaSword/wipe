import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { createScreenshotSchema } from "../validations/schemas/screenshot.schema";
import { Screenshot } from "../models/screenshot.model";
import { uploadFileToS3 } from "../utils/awsS3Backet";
import { AspectRatio } from "../models/aspectRatio.model";
import { BackgroundColor } from "../models/backgroundColor.model";
import {
  fileNameSchema,
  imageSchema,
} from "../validations/schemas/comman.schema";

const getAllScreenshots = asyncHandler(
  async (req: Request, res: Response) => {}
);

const createScreenshot = asyncHandler(async (req: Request, res: Response) => {
  const parserData = createScreenshotSchema.safeParse(req.body);
  const imageLocalPath = imageSchema.safeParse(req.file?.path);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const fileNameExist = await Screenshot.findOne({
    fileName: parserData.data.fileName,
  });
  if (fileNameExist) {
    throw new ApiError(409, "File name is already taken, use other name");
  }

  const aspectRatioToBeAdded = await AspectRatio.findOne({
    aspectRatioName: parserData.data.aspectRatioName,
  });
  if (!aspectRatioToBeAdded) {
    throw new ApiError(404, "Aspect Ratio not found");
  }

  const backgroundColorToAdded = await BackgroundColor.findOne({
    backgroundColorName: parserData.data.backgroundColorName,
  });
  if (!backgroundColorToAdded) {
    throw new ApiError(404, "Background Color not found");
  }

  const uploadImage = await uploadFileToS3(imageLocalPath, "wipe", "");
  if (!uploadImage) {
    throw new ApiError(400, "Image fail to upload");
  }

  const createScreenshot = await Screenshot.create({
    fileName: parserData.data.fileName,
    image: uploadImage,
    owner: req.user._id,
    aspectRatioId: aspectRatioToBeAdded._id,
    backgroundColorId: backgroundColorToAdded._id,
  });
  if (!createScreenshot) {
    throw new ApiError(
      500,
      "Failed to create screenshot. Please try again later"
    );
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { screenshot: createScreenshot },
        "Screenshot create successfully"
      )
    );
});

const getScreenshotById = asyncHandler(
  async (req: Request, res: Response) => {}
);

const updateScreenshot = asyncHandler(
  async (req: Request, res: Response) => {}
);

const removeScreenshotImage = asyncHandler(
  async (req: Request, res: Response) => {}
);

const deleteScreenshot = asyncHandler(
  async (req: Request, res: Response) => {}
);

export {
  getAllScreenshots,
  createScreenshot,
  updateScreenshot,
  deleteScreenshot,
  getScreenshotById,
  removeScreenshotImage,
};
