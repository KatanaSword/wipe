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
  colorOneHexCode: z.string().regex(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})/, {
    message: "Invalid color hex code",
  }),
  colorTwoHexCode: z.string().regex(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})/, {
    message: "Invalid color hex code",
  }),
});

const updateBackgroundColorSchema = z.object({
  backgroundColorName: z
    .string()
    .min(3, {
      message: "Background color name must be at least 3 characters long",
    })
    .max(15, {
      message: "Background color name must not exceed 15 characters",
    })
    .optional(),
  colorOneHexCode: z
    .string()
    .regex(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})/, {
      message: "Invalid color hex code",
    })
    .optional(),
  colorTwoHexCode: z
    .string()
    .regex(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})/, {
      message: "Invalid color hex code",
    })
    .optional(),
});

const backgroundColorIdSchema = z.object({
  backgroundColorId: z.string(),
});

export {
  createBackgroundColorSchema,
  updateBackgroundColorSchema,
  backgroundColorIdSchema,
};
