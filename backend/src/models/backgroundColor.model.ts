import { model, Schema } from "mongoose";
import { IBackgroundColor } from "../type";

const backgroundColorSchema: Schema<IBackgroundColor> = new Schema(
  {
    backgroundColorName: {
      type: String,
      required: true,
      unique: true,
    },
    colorOneHexCode: {
      type: String,
      required: true,
    },
    colorTwoHexCode: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const BackgroundColor = model<IBackgroundColor>(
  "BackgroundColor",
  backgroundColorSchema
);
