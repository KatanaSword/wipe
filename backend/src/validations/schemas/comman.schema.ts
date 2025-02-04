import { z } from "zod";

const imageSchema = z.object({
  image: z.string(),
});

const fileNameSchema = z.object({
  fileName: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(15, { message: "Username must not exceed 15 characters" })
    .optional(),
});

const aspectRatioSchema = z.object({
  aspectRatioName: z.string().optional(),
});

const backgroundColorSchema = z.object({
  backgroundColorName: z.string().optional(),
});

export {
  imageSchema,
  fileNameSchema,
  aspectRatioSchema,
  backgroundColorSchema,
};
