import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  backgroundColorIdSchema,
  createBackgroundColorSchema,
  updateBackgroundColorSchema,
} from "../validations/schemas/backgroundColor.schema";
import { ApiError } from "../utils/ApiError";
import { BackgroundColor } from "../models/backgroundColor.model";
import { ApiResponse } from "../utils/ApiResponse";

const getAllBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {}
);

const createBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = createBackgroundColorSchema.safeParse(req.body);
    const errorMessage = parserData.error?.issues.map((issue) => issue.message);
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty", errorMessage);
    }

    const backgroundColorNameExist = await BackgroundColor.findOne({
      backgroundColorName: parserData.data.backgroundColorName,
    });
    if (backgroundColorNameExist) {
      throw new ApiError(
        409,
        "Background color already exist, use another name"
      );
    }

    const createBackgroundColor = await BackgroundColor.create({
      backgroundColorName: parserData.data.backgroundColorName,
      colorOneHexCode: parserData.data.colorOneHexCode,
      colorTwoHexCode: parserData.data.colorTwoHexCode,
      ownerId: req.user._id,
    });
    if (!createBackgroundColor) {
      throw new ApiError(
        500,
        "Failed to create background color. Please try again later"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { backgroundColor: createBackgroundColor },
          "Background color create successfully"
        )
      );
  }
);

const getBackgroundColorById = asyncHandler(
  async (req: Request, res: Response) => {
    const parserId = backgroundColorIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(
        400,
        "The background color id field is missing or invalid"
      );
    }

    const backgroundColor = await BackgroundColor.findById(
      parserId.data.backgroundColorId
    );
    if (!backgroundColor) {
      throw new ApiError(404, "Background color is not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          backgroundColor,
          "Fetch background color successfully"
        )
      );
  }
);

const updateBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = updateBackgroundColorSchema.safeParse(req.body);
    const parserId = backgroundColorIdSchema.safeParse(req.params);
    const errorMessage = parserData.error?.issues.map((issue) => issue.message);
    if (!parserData.success) {
      throw new ApiError(400, "", errorMessage);
    }
    if (!parserId.success) {
      throw new ApiError(
        400,
        "The background color id field is missing or invalid"
      );
    }

    const backgroundColorNameExist = await BackgroundColor.findOne({
      backgroundColorName: parserData.data.backgroundColorName,
    });
    if (backgroundColorNameExist) {
      throw new ApiError(
        409,
        "Background color name already exist, try other name"
      );
    }

    const updateBackgroundColor = await BackgroundColor.findByIdAndUpdate(
      parserId.data.backgroundColorId,
      {
        $set: {
          backgroundColorName: parserData.data.backgroundColorName,
          colorOneHexCode: parserData.data.colorOneHexCode,
          colorTwoHexCode: parserData.data.colorTwoHexCode,
        },
      },
      { new: true }
    );
    if (!updateBackgroundColor) {
      throw new ApiError(
        500,
        "Background color update failed, Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updateBackgroundColor,
          "Background color update successfully"
        )
      );
  }
);

const removeBackgroundColorImage = asyncHandler(
  async (req: Request, res: Response) => {}
);

const deleteBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {}
);

export {
  getAllBackgroundColor,
  createBackgroundColor,
  getBackgroundColorById,
  updateBackgroundColor,
  removeBackgroundColorImage,
  deleteBackgroundColor,
};
