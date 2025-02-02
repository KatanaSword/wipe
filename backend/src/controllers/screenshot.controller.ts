import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  createScreenshotSchema,
  screenshotIdSchema,
} from "../validations/schemas/screenshot.schema";
import { Screenshot } from "../models/screenshot.model";
import { uploadFileToS3 } from "../utils/awsS3Backet";
import { AspectRatio } from "../models/aspectRatio.model";
import { BackgroundColor } from "../models/backgroundColor.model";
import {
  aspectRatioSchema,
  backgroundColorSchema,
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
  if (!imageLocalPath.success) {
    throw new ApiError(400, "Image file path is missing");
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

const getScreenshotById = asyncHandler(async (req: Request, res: Response) => {
  const parserId = screenshotIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(400, "The screenshot id is missing or invalid");
  }

  const screenshot = await Screenshot.findById(parserId.data.screenshortId);
  if (!screenshot) {
    throw new ApiError(404, "Screenshot post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, screenshot, "Fetch screenshot successfully"));
});

const updateScreenshotImage = asyncHandler(
  async (req: Request, res: Response) => {
    const parserId = screenshotIdSchema.safeParse(req.params);
    const imageLocalPath = imageSchema.safeParse(req.file?.path);
    if (!parserId.success) {
      throw new ApiError(400, "The screenshot id is missing or invalid");
    }
    if (!imageLocalPath.success) {
      throw new ApiError(400, "Image file path is missing");
    }

    const uploadImage = await uploadFileToS3(imageLocalPath, "", "");
    if (!uploadImage) {
      throw new ApiError(400, "Image fail to upload");
    }

    const screenshot = await Screenshot.findByIdAndUpdate(
      parserId.data.screenshotId,
      {
        $set: {
          image: uploadImage,
        },
      },
      { new: true }
    );
    if (!screenshot) {
      throw new ApiError(
        500,
        "Failed to update screenshot image. Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, screenshot, "Update screenshot image successfully")
      );
  }
);

const updateScreenshotAspectRatio = asyncHandler(
  async (req: Request, res: Response) => {
    const parserId = screenshotIdSchema.safeParse(req.params);
    const parserData = aspectRatioSchema.safeParse(req.body);
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty");
    }
    if (!parserId.success) {
      throw new ApiError(400, "The screenshot id is missing or invalid");
    }

    const aspectRatioToBeAdded = await AspectRatio.findOne({
      aspectRatioName: parserData.data.aspectRatioName,
    });
    if (!aspectRatioToBeAdded) {
      throw new ApiError(404, "Aspect ratio not found");
    }

    const screenshot = await Screenshot.findByIdAndUpdate(
      parserId.data.screenshotId,
      {
        $set: {
          aspectRatioId: aspectRatioToBeAdded._id,
        },
      },
      { new: true }
    );
    if (!screenshot) {
      throw new ApiError(
        500,
        "Failed to update aspect ratio screenshot. Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          screenshot,
          "Update aspect ratio in screenshot successfully"
        )
      );
  }
);

const updateScreenshotBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = backgroundColorSchema.safeParse(req.body);
    const parserId = screenshotIdSchema.safeParse(req.params);
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty");
    }
    if (!parserId.success) {
      throw new ApiError(400, "The screenshot id is missing or invalid");
    }

    const backgroundColorToBeAdded = await BackgroundColor.findOne({
      backgroundColorName: parserData.data.backgroundColorName,
    });
    if (!backgroundColorToBeAdded) {
      throw new ApiError(404, "Aspect ratio not found");
    }

    const screenshot = await Screenshot.findByIdAndUpdate(
      parserId.data.screenshotId,
      {
        $set: {
          backgroundColorId: backgroundColorToBeAdded._id,
        },
      },
      { new: true }
    );
    if (!screenshot) {
      throw new ApiError(
        500,
        "Failed to update background color screenshot. Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          screenshot,
          "Update background color in screenshot successfully"
        )
      );
  }
);

const deleteScreenshot = asyncHandler(async (req: Request, res: Response) => {
  const parserId = screenshotIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(400, "The screenshot id is missing or invalid");
  }

  const screenshot = await Screenshot.findByIdAndDelete(
    parserId.data.screenshotId
  );
  if (!screenshot) {
    throw new ApiError(
      500,
      "Failed to delete screenshot. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Delete screenshot post successfully"));
});

export {
  getAllScreenshots,
  createScreenshot,
  deleteScreenshot,
  getScreenshotById,
  updateScreenshotAspectRatio,
  updateScreenshotBackgroundColor,
  updateScreenshotImage,
};
