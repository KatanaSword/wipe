import { Schema, model } from "mongoose";
import { IAspectRatio } from "../type";

const aspectRatioSchema: Schema<IAspectRatio> = new Schema(
  {
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

export const aspectRatio = model<IAspectRatio>(
  "AspectRatio",
  aspectRatioSchema
);
