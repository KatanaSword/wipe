import { model, Schema } from "mongoose";
import { ICode } from "../type";

const codeSchema: Schema<ICode> = new Schema(
  {
    fileName: {
      type: String,
      minlength: 4,
      maxlength: 15,
      required: true,
      default: "untitled file",
    },
    codeFileName: {
      type: String,
      minlength: 4,
      maxlength: 20,
      required: true,
      default: "untitled-1",
    },
    code: {
      type: String,
      default:
        "export default function chai(name) {for (let i = 0; i < 10; i++) { console.log(`I love ${name} chai`) }}; chai(milk)",
    },
    language: {
      type: String,
      default: "javaScript",
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

export const Code = model<ICode>("Code", codeSchema);
