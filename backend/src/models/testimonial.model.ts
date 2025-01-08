import { model, Schema } from "mongoose";
import { ITestimonial } from "../type";

const testimonialSchema: Schema<ITestimonial> = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      default: "untitled file",
    },
    avatar: {
      type: {
        url: String,
        publicId: String,
      },
      default: {
        url: "",
        publicId: "",
      },
    },
    name: {
      type: String,
      default: "Saurabh Tajane",
    },
    stars: {
      type: Number,
      default: 5,
    },
    review: {
      type: String,
      maxlength: 100,
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

export const Testimonial = model<ITestimonial>(
  "Testimonial",
  testimonialSchema
);
