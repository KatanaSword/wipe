import { Schema, model } from "mongoose";
import { ICanvas } from "../type";

const canvasSchema: Schema<ICanvas> = new Schema(
  {
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: "#fffff",
    },
  },
  { timestamps: true }
);

export const Canvas = model<ICanvas>("Canvas", canvasSchema);
