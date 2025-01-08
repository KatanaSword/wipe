import { Schema, model } from "mongoose";
import { IPost } from "../type";

const postSchema: Schema<IPost> = new Schema(
  {
    screenshorts: {
      type: [
        {
          screenshortId: {
            type: Schema.Types.ObjectId,
            ref: "Screenshort",
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
