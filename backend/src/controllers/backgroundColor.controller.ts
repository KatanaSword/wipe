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
      colorHexCode: {
        colorOne: parserData.data.colorOne,
        colorTwo: parserData.data.colorTwo,
      },
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
  async (req: Request, res: Response) => {}
);

const updateBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = updateBackgroundColorSchema.safeParse(req.body);
    console.log("ParserData:", parserData);
    const parserId = backgroundColorIdSchema.safeParse(req.params);
    console.log("ParserId:", parserId);
    const errorMessage = parserData.error?.issues.map((issue) => issue.message);
    console.log("ErrorMessage:", errorMessage);
    if (!parserData.success || !parserId.success) {
      throw new ApiError(400, "", errorMessage);
    }

    const backgroundColorNameExist = await BackgroundColor.findOne({
      backgroundColorName: parserData.data.backgroundColorName,
    });
    console.log("BackgroundColorNameExist:", backgroundColorNameExist);
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
          colorHexCode: {
            colorOne: parserData.data.colorOne,
            colorTwo: parserData.data.colorTwo,
          },
        },
      },
      { new: true }
    );
    console.log("UpdateBackgroundColor:", updateBackgroundColor);
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
