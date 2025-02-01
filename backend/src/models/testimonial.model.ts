import { model, Schema } from "mongoose";
import { ITestimonial } from "../type";

const testimonialSchema: Schema<ITestimonial> = new Schema(
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
      default: {
        url: "",
        publicId: "",
      },
    },
    fullName: {
      type: String,
    },
    stars: {
      type: Number,
      min: 1,
      max: 5,
    },
    testimonial: {
      type: String,
      minLength: 50,
      maxlength: 250,
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

export const Testimonial = model<ITestimonial>(
  "Testimonial",
  testimonialSchema
);
