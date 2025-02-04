import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  aspectRatioIdSchema,
  createAspectRatioSchema,
  updateAspectRatioSchema,
} from "../validations/schemas/aspectRatio.schema";
import { AspectRatio } from "../models/aspectRatio.model";
import { ApiResponse } from "../utils/ApiResponse";

const getAllAspectRatio = asyncHandler(async (req: Request, res: Response) => {
  const aspectRatios = await AspectRatio.aggregate([{ $match: {} }]);
  if (aspectRatios.length < 1) {
    throw new ApiError(404, "Aspect ratio not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, aspectRatios, "Aspect ratio fetch successfully")
    );
});

const createAspectRatio = asyncHandler(async (req: Request, res: Response) => {
  const parserData = createAspectRatioSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const aspectRatioAlreadyExist = await AspectRatio.findOne({
    $or: [
      { aspectRatioName: parserData.data.aspectRatioName },
      { height: parserData.data.height },
      { width: parserData.data.width },
    ],
  });
  if (!aspectRatioAlreadyExist) {
    throw new ApiError(400, "Aspect ratio already exist");
  }

  const createAspectRatio = await AspectRatio.create({
    aspectRatioName: parserData.data.aspectRatioName,
    height: parserData.data.height,
    width: parserData.data.width,
    ownerId: req.user._id,
  });
  if (!createAspectRatio) {
    throw new ApiError(
      500,
      "Failed to create aspect ratio. Please try again later"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { aspectRatio: createAspectRatio },
        "Create aspect ratio successfully"
      )
    );
});

const getAspectRatioById = asyncHandler(async (req: Request, res: Response) => {
  const parserId = aspectRatioIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(404, "The aspect ratio id field is missing or invalid");
  }

  const aspectRatio = await AspectRatio.findById(parserId.data.aspectRatioId);
  if (!aspectRatio) {
    throw new ApiError(404, "Aspect ratio not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, aspectRatio, "Aspect ration fetch successfully")
    );
});

const updateAspectRatio = asyncHandler(async (req: Request, res: Response) => {
  const parserData = updateAspectRatioSchema.safeParse(req.body);
  const parserId = aspectRatioIdSchema.safeParse(req.params);
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

  const updateAspectRatio = await AspectRatio.findByIdAndUpdate(
    parserId.data.aspectRatioId,
    {
      $set: {
        aspectRatioName: parserData.data.aspectRatioName,
        height: parserData.data.height,
        width: parserData.data.width,
      },
    },
    { new: true }
  );
  if (!updateAspectRatio) {
    throw new ApiError(
      500,
      "Aspect ratio update failed, Please try again later"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateAspectRatio,
        "Aspect ratio update successfully"
      )
    );
});

const deleteAspectRatio = asyncHandler(async (req: Request, res: Response) => {
  const parserId = aspectRatioIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(400, "The aspect ratio id field is missing or invalid");
  }

  const aspectRatio = await AspectRatio.findByIdAndDelete(
    parserId.data.aspectRatioId
  );
  if (!aspectRatio) {
    throw new ApiError(
      500,
      "Aspect ratio delete failed. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Aspect ratio delete successfully"));
});

export {
  getAllAspectRatio,
  createAspectRatio,
  getAspectRatioById,
  updateAspectRatio,
  deleteAspectRatio,
};
