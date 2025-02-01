import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  codeIdSchema,
  createCodeSchema,
  updateCodeSchema,
} from "../validations/schemas/code.schema";
import { ApiError } from "../utils/ApiError";
import { Code } from "../models/code.model";
import { AspectRatio } from "../models/aspectRatio.model";
import { BackgroundColor } from "../models/backgroundColor.model";
import { ApiResponse } from "../utils/ApiResponse";
import {
  aspectRatioSchema,
  backgroundColorSchema,
  fileNameSchema,
} from "../validations/schemas/comman.schema";

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
    throw new ApiError(409, "File name already exist, try other name");
  }

  const aspectRatioToBeAdded = await AspectRatio.findOne({
    aspectRatio: parserData.data.aspectRatioName,
  });
  if (!aspectRatioToBeAdded) {
    throw new ApiError(404, "Aspect ratio not found");
  }

  const backgroundColorToBeAdded = await BackgroundColor.findOne({
    backgroundColor: parserData.data.backgroundColorName,
  });
  if (!backgroundColorToBeAdded) {
    throw new ApiError(404, "Background color not found");
  }

  const code = await Code.create({
    fileName: parserData.data.fileName,
    codeFileName: parserData.data.codeFileName,
    code: parserData.data.code,
    language: parserData.data.language,
    owner: req.user._id,
    aspectRatioId: aspectRatioToBeAdded._id,
    backgroundColorId: backgroundColorToBeAdded._id,
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

const getCodeById = asyncHandler(async (req: Request, res: Response) => {
  const parserId = codeIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(400, "The code id field is missing or invalid");
  }

  const code = await Code.findById(parserId.data.codeId);
  if (!code) {
    throw new ApiError(404, "Code post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, code, "Code fetch successfully"));
});

const updateCode = asyncHandler(async (req: Request, res: Response) => {
  const parserData = updateCodeSchema.safeParse(req.body);
  const parserId = codeIdSchema.safeParse(req.params);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }
  if (!parserId) {
    throw new ApiError(401, "The code id is missing or invalid");
  }

  const code = await Code.findByIdAndUpdate(
    parserId.data?.codeId,
    {
      $set: {
        codeFileName: parserData.data.codeFileName,
        code: parserData.data.code,
        language: parserData.data.language,
      },
    },
    { new: true }
  );
  if (!code) {
    throw new ApiError(
      500,
      "Failed to update code post. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, code, "Update code post successfully"));
});

const updateFileName = asyncHandler(async (req: Request, res: Response) => {
  const parserData = fileNameSchema.safeParse(req.body);
  const parserId = codeIdSchema.safeParse(req.params);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  if (!parserId.success) {
    throw new ApiError(400, "The code id is missing or invalid");
  }

  const fileNameExist = await Code.findOne({
    fileName: parserData.data.fileName,
  });
  if (fileNameExist) {
    throw new ApiError(409, "File name is already exist, try other name");
  }

  const code = await Code.findByIdAndUpdate(
    parserId.data.codeId,
    {
      $set: {
        fileName: parserData.data.fileName,
      },
    },
    { new: true }
  );
  if (!code) {
    throw new ApiError(
      500,
      "Failed to update file name. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, code, "File name update successfully"));
});

const updateCodeAspectRatio = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = aspectRatioSchema.safeParse(req.body);
    const parserId = codeIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "The code id is missing or invalid");
    }

    const aspectRatioToBeAdded = await Code.findOne({
      aspectRatioName: parserData.data?.aspectRatioName,
    });
    if (!aspectRatioToBeAdded) {
      throw new ApiError(404, "Aspect ratio not found");
    }

    const code = await Code.findByIdAndUpdate(
      parserId.data.codeId,
      {
        $set: {
          aspectRatioId: aspectRatioToBeAdded._id,
        },
      },
      { new: true }
    );
    if (!code) {
      throw new ApiError(
        500,
        "Failed to update aspect ratio. Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, code, "Update code post aspect ratio successfully")
      );
  }
);

const updateCodeBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = backgroundColorSchema.safeParse(req.body);
    const parserId = codeIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "The code id is missing or invalid");
    }

    const backgroundColorToBeAdded = await Code.findOne({
      backgroundColorName: parserData.data?.backgroundColorName,
    });
    if (!backgroundColorToBeAdded) {
      throw new ApiError(404, "Background color not found");
    }

    const code = await Code.findByIdAndUpdate(
      parserId.data.codeId,
      {
        $set: {
          backgroundColorId: backgroundColorToBeAdded._id,
        },
      },
      { new: true }
    );
    if (!code) {
      throw new ApiError(
        500,
        "Failed to update code background color. Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, code, "Update code background color successfully")
      );
  }
);

export {
  createCode,
  getCodeById,
  updateCode,
  updateFileName,
  updateCodeAspectRatio,
  updateCodeBackgroundColor,
};
