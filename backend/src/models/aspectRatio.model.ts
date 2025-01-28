import { Schema, model } from "mongoose";
import { IAspectRatio } from "../type";

const aspectRatioSchema: Schema<IAspectRatio> = new Schema(
  {
    aspectRatioName: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
      default: 0,
    },
    width: {
      type: Number,
      required: true,
      default: 0,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const AspectRatio = model<IAspectRatio>(
  "AspectRatio",
  aspectRatioSchema
);
