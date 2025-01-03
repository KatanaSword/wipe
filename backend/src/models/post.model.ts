import { Schema, model } from "mongoose";
import { IPost } from "../type";

const postSchema: Schema<IPost> = new Schema(
  {
    name: {
      type: String,
      default: "untitled name",
    },
    image: {
      type: {
        url: String,
        publicId: String,
      },
    },
    video: {
      type: {
        url: String,
        publicId: String,
      },
    },
    content: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
