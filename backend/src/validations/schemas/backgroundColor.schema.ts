import { z } from "zod";

const createBackgroundColorSchema = z.object({
  backgroundColorName: z
    .string()
    .min(3, {
      message: "Background color name must be at least 3 characters long",
    })
    .max(15, {
      message: "Background color name must not exceed 15 characters",
    }),
  colorOne: z
    .string()
    .regex(
      /^#(?:[a-fA-F][0-9a-f]{2}|[a-fA-F][0-9a-f]{3}|[a-fA-F][0-9a-f]{5}|[a-fA-F][0-9a-f]{7})$/,
      { message: "Invalid color hex code" }
    ),
  colorTwo: z
    .string()
    .regex(
      /^#(?:[a-fA-F][0-9a-f]{2}|[a-fA-F][0-9a-f]{3}|[a-fA-F][0-9a-f]{5}|[a-fA-F][0-9a-f]{7})$/,
      { message: "Invalid color hex code" }
    ),
});

export { createBackgroundColorSchema };
