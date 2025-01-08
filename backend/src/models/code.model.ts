import { model, Schema } from "mongoose";
import { ICode } from "../type";

const codeSchema: Schema<ICode> = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      default: "untitled file",
    },
    codeFileName: {
      type: String,
      required: true,
      default: "script.js",
    },
    code: {
      type: String,
      default:
        "function chai(name) {for (let i = 0; i < 10; i++) { console.log(`I love ${name} chai`) }}; chai(milk)",
    },
    language: {
      type: String,
      default: "javaScript",
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

export const Code = model<ICode>("Code", codeSchema);
