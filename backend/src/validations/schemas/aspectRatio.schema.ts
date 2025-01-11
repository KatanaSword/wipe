import z from "zod";

const createAspectRatioSchema = z.object({
  aspectRatioName: z
    .string()
    .toLowerCase()
    .trim()
    .min(4, { message: "Name must be at least 4 characters long" })
    .max(20, { message: "Name must not exceed 20 characters" }),
  height: z
    .number()
    .min(200, { message: "Height must be at least 200 pixel" })
    .max(1080, { message: "Height must not exceed 1080 pixel" }),
  width: z
    .number()
    .min(200, { message: "Width must be at least 200 pixel" })
    .max(1080, { message: "Width must not exceed 1080 pixel" }),
});

export { createAspectRatioSchema };
