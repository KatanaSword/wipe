import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { createBackgroundColorSchema } from "../validations/schemas/backgroundColor.schema";
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

    const backgroundColorExist = await BackgroundColor.findOne({
      backgroundColorName: parserData.data.backgroundColorName,
    });
    if (backgroundColorExist) {
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
  async (req: Request, res: Response) => {}
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
