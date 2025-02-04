import { z } from "zod";

const createCodeSchema = z.object({
  fileName: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(15, { message: "Username must not exceed 15 characters" }),
  codeFileName: z
    .string()
    .trim()
    .min(4, { message: "Code file name must be at least 4 characters long" })
    .max(20, { message: "Code file name must not exceed 20 characters" })
    .default("untitled-1"),
  code: z.string(),
  language: z.string(),
  aspectRatioName: z.string(),
  backgroundColorName: z.string(),
});

const updateCodeSchema = z.object({
  codeFileName: z
    .string()
    .trim()
    .min(4, { message: "Code file name must be at least 4 characters long" })
    .max(20, { message: "Code file name must not exceed 20 characters" })
    .default("untitled-1")
    .optional(),
  code: z.string().optional(),
  language: z.string().optional(),
});

const codeIdSchema = z.object({
  codeId: z.string(),
});

export { createCodeSchema, updateCodeSchema, codeIdSchema };
