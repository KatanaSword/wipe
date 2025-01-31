import { model, Schema } from "mongoose";
import { IScreenshot } from "../type";

const screenshotSchema: Schema<IScreenshot> = new Schema(
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

export const Screenshot = model<IScreenshot>("Screenshot", screenshotSchema);
