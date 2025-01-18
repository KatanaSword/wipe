import { z } from "zod";

const createCodeSchema = z.object({
  fileName: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "File name must be at least 4 characters long" })
    .max(15, { message: "File name must not exceed 15 characters" })
    .default("untitled file"),
  codeFileName: z
    .string()
    .trim()
    .min(4, { message: "Code file name must be at least 4 characters long" })
    .max(20, { message: "Code file name must not exceed 20 characters" })
    .default("untitled-1"),
  code: z
    .string()
    .default(
      "export default function chai(name) {for (let i = 0; i < 10; i++) { console.log(`I love ${name} chai`) }}; chai(milk)"
    ),
  language: z.string().default("javaScript"),
  aspectRatioId: z.string(),
  backgroundColorId: z.string(),
});

const updateCodeSchema = z.object({
  fileName: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "File name must be at least 4 characters long" })
    .max(15, { message: "File name must not exceed 15 characters" })
    .default("untitled file")
    .optional(),
  codeFileName: z
    .string()
    .trim()
    .min(4, { message: "Code file name must be at least 4 characters long" })
    .max(20, { message: "Code file name must not exceed 20 characters" })
    .default("untitled-1")
    .optional(),
  code: z
    .string()
    .default(
      "export default function chai(name) {for (let i = 0; i < 10; i++) { console.log(`I love ${name} chai`) }}; chai(milk)"
    )
    .optional(),
  language: z.string().default("javaScript").optional(),
});

const codeIdSchema = z.object({
  codeId: z.string(),
});

export { createCodeSchema, updateCodeSchema, codeIdSchema };
