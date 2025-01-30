import { model, Schema } from "mongoose";
import { IBlog } from "../type";

const blogSchema: Schema<IBlog> = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      minLength: 4,
      maxlength: 15,
      default: "untitled file",
    },
    image: {
      type: {
        url: String,
        publicId: String,
      },
    },
    title: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 150,
    },
    summary: {
      type: String,
      required: true,
      minlength: 50,
      maxLength: 250,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    aspectRatioId: {
      type: Schema.Types.ObjectId,
      ref: "AspectRatio",
    },
    backgroundColorId: {
      type: Schema.Types.ObjectId,
      ref: "BackgroundColor",
    },
  },
  { timestamps: true }
);

export const Blog = model<IBlog>("Blog", blogSchema);
