import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  blogIdSchema,
  createBlogSchema,
  updateBlogSchema,
} from "../validations/schemas/blog.schema";
import { ApiError } from "../utils/ApiError";
import { Blog } from "../models/blog.model";
import {
  aspectRatioSchema,
  backgroundColorSchema,
  fileNameSchema,
  imageSchema,
} from "../validations/schemas/comman.schema";
import { uploadFileToS3 } from "../utils/awsS3Backet";
import { AspectRatio } from "../models/aspectRatio.model";
import { BackgroundColor } from "../models/backgroundColor.model";
import { ApiResponse } from "../utils/ApiResponse";

const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  const blogAggregate = await Blog.aggregate([{ $match: {} }]);
  if (blogAggregate.length < 1) {
    throw new ApiError(404, "Blogs not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blogAggregate, "Blogs fetch successfully"));
});

const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const parserData = createBlogSchema.safeParse(req.body);
  const parserFileName = fileNameSchema.safeParse(req.body);
  const parserAspectRatio = aspectRatioSchema.safeParse(req.body);
  const parserBackgroundColor = backgroundColorSchema.safeParse(req.body);
  const imageLocalPath = imageSchema.safeParse(req.file?.path);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (
    !parserData.success ||
    !parserAspectRatio.success ||
    !parserBackgroundColor.success ||
    !parserFileName.success
  ) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  if (!imageLocalPath.success) {
    throw new ApiError(400, "Image path is missing");
  }

  const fileNameExist = await Blog.findOne({
    fileName: parserFileName.data.fileName,
  });
  if (fileNameExist) {
    throw new ApiError(409, "File name already exist, try another other name");
  }

  const aspectRatioToBeAdded = await AspectRatio.findOne({
    aspectRatioName: parserAspectRatio.data.aspectRatio,
  });
  if (!aspectRatioToBeAdded) {
    throw new ApiError(404, "Aspect ratio not found");
  }

  const backgroundColorToBeAdded = await BackgroundColor.findOne({
    backgroundColorName: parserBackgroundColor.data.backgroundColor,
  });
  if (!backgroundColorToBeAdded) {
    throw new ApiError(404, "Background color not found");
  }

  const uploadImage = await uploadFileToS3(imageLocalPath, "", "");
  if (!uploadFileToS3) {
    throw new ApiError(400, "");
  }

  const blog = await Blog.create({
    fileName: parserFileName.data.fileName,
    title: parserData.data.title,
    summary: parserData.data.summary,
    image: uploadImage,
    owner: req.user.id,
    aspectRatioId: aspectRatioToBeAdded._id,
    backgroundColorId: backgroundColorToBeAdded._id,
  });
  if (!blog) {
    throw new ApiError(
      500,
      "Failed to create blog post. Please try again later"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, blog, "Blog post create successfully"));
});

const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const parserId = blogIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(400, "The blog id field is missing or invalid");
  }

  const blog = await Blog.findById(parserId.data.blogId);
  if (!blog) {
    throw new ApiError(404, "Blog is not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog fetch successfully"));
});

const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const parserData = updateBlogSchema.safeParse(req.body);
  const parserId = blogIdSchema.safeParse(req.params);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }
  if (!parserId.success) {
    throw new ApiError(400, "The blog id field is missing or invalid");
  }

  const blog = await Blog.findByIdAndUpdate(
    parserId.data.blogId,
    {
      $set: {
        title: parserData.data.title,
        summary: parserData.data.summary,
      },
    },
    { new: true }
  );
  if (!blog) {
    throw new ApiError(500, "Blog update failed, Please try again later");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Update blog successfully"));
});

const updateFileName = asyncHandler(async (req: Request, res: Response) => {
  const parserData = fileNameSchema.safeParse(req.body);
  const parserId = blogIdSchema.safeParse(req.params);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }
  if (!parserId.success) {
    throw new ApiError(400, "The blog id field is missing or invalid");
  }

  const fileNameExist = await Blog.findOne({
    fileName: parserData.data.fileName,
  });
  if (fileNameExist) {
    throw new ApiError(409, "File name already exist, try other name");
  }

  const fileName = await Blog.findByIdAndUpdate(
    parserId.data.blogId,
    {
      $set: { fileName: parserData.data.fileName },
    },
    { new: true }
  );
  if (!fileName) {
    throw new ApiError(500, "File name update failed, Please try again later");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, fileName, "File name update successfully"));
});

const updateImage = asyncHandler(async (req: Request, res: Response) => {
  const;
});

const updateAspectRatio;

const updateBackgroundColor;

const deleteBlog;

export {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  updateFileName,
  updateImage,
  updateAspectRatio,
  updateBackgroundColor,
  deleteBlog,
};
