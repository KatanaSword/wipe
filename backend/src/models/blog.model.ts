import { model, Schema } from "mongoose";
import { IBlog } from "../type";

const blogSchema: Schema<IBlog> = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      default: "untitled file",
    },
    image: {
      type: {
        url: String,
        publicId: String,
      },
    },
    summary: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    canvasId: {
      type: Schema.Types.ObjectId,
      ref: "Canvas",
    },
  },
  { timestamps: true }
);

export const Blog = model<IBlog>("Blog", blogSchema);
