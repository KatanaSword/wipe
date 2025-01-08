import { model, Schema } from "mongoose";
import { IScreenshort } from "../type";

const screenshortSchema: Schema<IScreenshort> = new Schema(
  {
    fileName: {
      type: String,
      lowercase: true,
      default: "untitled file",
    },
    image: {
      type: {
        url: String,
        publicId: String,
      },
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

export const Screenshort = model<IScreenshort>(
  "Screenshort",
  screenshortSchema
);
