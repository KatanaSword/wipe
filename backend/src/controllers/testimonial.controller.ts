import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  createTestimonialSchema,
  testimonialIdSchema,
  updateTestimonialSchema,
} from "../validations/schemas/testimonial.schema";
import { ApiError } from "../utils/ApiError";
import { AspectRatio } from "../models/aspectRatio.model";
import { BackgroundColor } from "../models/backgroundColor.model";
import { uploadFileToS3 } from "../utils/awsS3Backet";
import {
  fileNameSchema,
  imageSchema,
} from "../validations/schemas/comman.schema";
import { Testimonial } from "../models/testimonial.model";
import { ApiResponse } from "../utils/ApiResponse";
import { updateAspectRatioSchema } from "../validations/schemas/aspectRatio.schema";
import { updateBackgroundColorSchema } from "../validations/schemas/backgroundColor.schema";

const getAllTestimonials = asyncHandler(async (_, res: Response) => {
  const testimonials = await Testimonial.aggregate([{ $match: {} }]);
  if (testimonials.length < 1) {
    throw new ApiError(404, "Testimonial not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, testimonials, "Testimonials fetch successfully")
    );
});

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

const updateTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const parserData = updateTestimonialSchema.safeParse(req.body);
  const parserId = testimonialIdSchema.safeParse(req.params);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }
  if (!parserId.success) {
    throw new ApiError(400, "Testimonial id is missing or invalid");
  }

  const updateTestimonial = await Testimonial.findByIdAndUpdate(
    parserId.data.testimonialId,
    {
      $set: {
        fullName: parserData.data.fullName,
        stars: parserData.data.stars,
        testimonial: parserData.data.testimonial,
      },
    },
    { new: true }
  );
  if (!updateTestimonial) {
    throw new ApiError(
      500,
      "Failed to update testimonial post. Please try again later"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateTestimonial,
        "Update testimonial post successfully"
      )
    );
});

const updateFileName = asyncHandler(async (req: Request, res: Response) => {
  const parserData = fileNameSchema.safeParse(req.body);
  const parserId = testimonialIdSchema.safeParse(req.params);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }
  if (!parserId.success) {
    throw new ApiError(400, "Testimonial id is missing or invalid");
  }

  const fileNameExist = await Testimonial.findOne({
    fileName: parserData.data.fileName,
  });
  if (fileNameExist) {
    throw new ApiError(409, "File name already exist, try other name");
  }

  const updateFileName = await Testimonial.findByIdAndUpdate(
    parserId.data.testimonialId,
    {
      $set: {
        fileName: parserData.data.fileName,
      },
    },
    { new: true }
  );
  if (!updateFileName) {
    throw new ApiError(
      500,
      "Failed to update filename testimonial post. Please try again later"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateFileName,
        "Update filename of testimonial post"
      )
    );
});

const updateTestimonialAspectRatio = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = updateAspectRatioSchema.safeParse(req.body);
    const parserId = testimonialIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "Testimonial id is missing or invalid");
    }

    const aspectRatioToBeAdded = await AspectRatio.findOne({
      aspectRatioName: parserData.data?.aspectRatioName,
    });
    if (!aspectRatioToBeAdded) {
      throw new ApiError(404, "Aspect ratio not successfully");
    }

    const updateTestimonialAspectRatio = await Testimonial.findByIdAndUpdate(
      parserId.data.testimonialId,
      {
        $set: {
          aspectRatioId: aspectRatioToBeAdded._id,
        },
      },
      { new: true }
    );
    if (!updateTestimonialAspectRatio) {
      throw new ApiError(
        500,
        "Failed to update aspect ratio of testimonial post. Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updateTestimonialAspectRatio,
          "Update testimonial post aspect ratio"
        )
      );
  }
);

const updateTestimonialBackgroundColor = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = updateBackgroundColorSchema.safeParse(req.body);
    const parserId = testimonialIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "Testimonial id is missing or invalid");
    }

    const backgroundColorToBeAdded = await BackgroundColor.findOne({
      backgroundColorName: parserData.data?.backgroundColorName,
    });
    if (!backgroundColorToBeAdded) {
      throw new ApiError(404, "Background color not successfully");
    }

    const updateTestimonialBackgroundColor =
      await Testimonial.findByIdAndUpdate(
        parserId.data.testimonialId,
        {
          $set: {
            backgroundColorId: backgroundColorToBeAdded._id,
          },
        },
        { new: true }
      );
    if (!updateTestimonialBackgroundColor) {
      throw new ApiError(
        500,
        "Failed to update background color of testimonial post. Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updateTestimonialBackgroundColor,
          "Update background color post aspect ratio"
        )
      );
  }
);

const updateTestimonialAvatar = asyncHandler(
  async (req: Request, res: Response) => {
    const imageLocalPath = imageSchema.safeParse(req.file?.path);
    const parserId = testimonialIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "Testimonial id is missing or invalid");
    }
    if (!imageLocalPath.success) {
      throw new ApiError(400, "Image fail to upload");
    }

    const uploadAvatar = await uploadFileToS3(
      imageLocalPath.data.image,
      "",
      ""
    );
    if (!uploadAvatar) {
      throw new ApiError(400, "Avatar failed to upload");
    }

    const updateTestimonialAvatar = await Testimonial.findByIdAndUpdate(
      parserId.data.testimonialId,
      {
        $set: {
          image: uploadAvatar,
        },
      },
      { new: true }
    );
    if (!updateTestimonialAvatar) {
      throw new ApiError(
        500,
        "Failed to update avatar testimonial post. Please try again later"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updateTestimonialAvatar,
          "Update avatar testimonial post"
        )
      );
  }
);

const deleteTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const parserId = testimonialIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(400, "Testimonial id is missing or invalid");
  }

  const testimonial = await Testimonial.findByIdAndDelete(
    parserId.data.testimonialId
  );
  if (!testimonial) {
    throw new ApiError(
      500,
      "Failed to delete testimonial post. Please try again later"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Delete testimonial post successfully"));
});

export {
  getAllTestimonials,
  createTestimonial,
  getTestimonialById,
  updateTestimonial,
  updateFileName,
  updateTestimonialAspectRatio,
  updateTestimonialBackgroundColor,
  updateTestimonialAvatar,
  deleteTestimonial,
};
