import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  createTestimonialSchema,
  testimonialIdSchema,
} from "../validations/schemas/testimonial.schema";
import { ApiError } from "../utils/ApiError";
import { AspectRatio } from "../models/aspectRatio.model";
import { BackgroundColor } from "../models/backgroundColor.model";
import { uploadFileToS3 } from "../utils/awsS3Backet";
import { imageSchema } from "../validations/schemas/comman.schema";
import { Testimonial } from "../models/testimonial.model";
import { ApiResponse } from "../utils/ApiResponse";

const getAllTestimonials = asyncHandler(
  async (req: Request, res: Response) => {}
);

const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const parserData = createTestimonialSchema.safeParse(req.body);
  const imageLocalPath = imageSchema.safeParse(req.file?.path);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }
  if (!imageLocalPath.success) {
    throw new ApiError(400, "Avatar is missing");
  }

  const fileNameExist = await Testimonial.findOne({
    fileName: parserData.data.fileName,
  });
  if (fileNameExist) {
    throw new ApiError(409, "File name already exist, try other name");
  }

  const aspectRatioToBeAdded = await AspectRatio.findOne({
    aspectRatioName: parserData.data.aspectRatioName,
  });
  if (!aspectRatioToBeAdded) {
    throw new ApiError(404, "Aspect ratio not found");
  }

  const backgroundColorToBeAdded = await BackgroundColor.findOne({
    backgroundColorName: parserData.data.backgroundColorName,
  });
  if (!backgroundColorToBeAdded) {
    throw new ApiError(404, "Background color not found");
  }

  const uploadAvatar = await uploadFileToS3(imageLocalPath.data.image, "", "");
  if (!uploadAvatar) {
    throw new ApiError(400, "Upload avatar fail");
  }

  const createTestimonial = await Testimonial.create({
    fileName: parserData.data.fileName,
    fullName: parserData.data.fullName,
    stars: parserData.data.stars,
    testimonial: parserData.data.testimonial,
    aspectRatioId: aspectRatioToBeAdded._id,
    backgroundColorId: backgroundColorToBeAdded._id,
    owner: req.user._id,
  });
  if (!createTestimonial) {
    throw new ApiError(
      500,
      "Failed to create testimonial post. Please try again later"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { testimonial: createTestimonial },
        "Create testimonial post successfully"
      )
    );
});

const getTestimonialById = asyncHandler(async (req: Request, res: Response) => {
  const parserId = testimonialIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(400, "Testimonial id is missing");
  }

  const testimonial = await Testimonial.findById(parserId.data.testimonialId);
  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, testimonial, "Fetch testimonial successfully"));
});

const updateTestimonial = asyncHandler(
  async (req: Request, res: Response) => {}
);

const updateFileName = asyncHandler(async (req: Request, res: Response) => {});

const updateTestimonialAspectRatio = asyncHandler(
  async (req: Request, res: Response) => {}
);

const updateTestimonialBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {}
);

const updateTestimonialAvatar = asyncHandler(
  async (req: Request, res: Response) => {}
);

const deleteTestimonial = asyncHandler(
  async (req: Request, res: Response) => {}
);

export { createTestimonial, getTestimonialById };
