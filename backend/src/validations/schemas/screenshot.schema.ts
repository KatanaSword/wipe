import { z } from "zod";

const createScreenshotSchema = z.object({
  fileName: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(15, { message: "Username must not exceed 15 characters" }),
  aspectRatioName: z.string(),
  backgroundColorName: z.string(),
});

const screenshotIdSchema = z.object({
  screenshotId: z.string(),
});

export { createScreenshotSchema, screenshotIdSchema };
