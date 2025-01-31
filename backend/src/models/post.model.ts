import { Schema, model } from "mongoose";
import { IPost } from "../type";

const postSchema: Schema<IPost> = new Schema(
  {
    screenshots: {
      type: [
        {
          screenshotId: {
            type: Schema.Types.ObjectId,
            ref: "Screenshot",
          },
        },
      ],
      default: [],
    },
    blogs: {
      type: [
        {
          blogId: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
          },
        },
      ],
      default: [],
    },
    codes: {
      type: [
        {
          codeId: {
            type: Schema.Types.ObjectId,
            ref: "Code",
          },
        },
      ],
      default: [],
    },
    testimonials: {
      type: [
        {
          testimonialId: {
            type: Schema.Types.ObjectId,
            ref: "Testimonial",
          },
        },
      ],
      default: [],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
