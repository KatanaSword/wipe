import z from "zod";

const createBackgroundColorSchema = z.object({
  backgroundColorName: z
    .string()
    .min(3, { message: "Background color must be at least 3 characters long" })
    .max(20, { message: "Background color must not exceed 20 characters" }),
  colorHexCode: z.object({
    colorOne: z
      .string()
      .regex(
        /^#(?:[a-fA-F][0-9a-f]{2}|[a-fA-F][0-9a-f]{3}|[a-fA-F][0-9a-f]{5}|[a-fA-F][0-9a-f]{7})$/
      ),
    colorTwo: z
      .string()
      .regex(
        /^#(?:[a-fA-F][0-9a-f]{2}|[a-fA-F][0-9a-f]{3}|[a-fA-F][0-9a-f]{5}|[a-fA-F][0-9a-f]{7})$/
      ),
  }),
});

export { createBackgroundColorSchema };
