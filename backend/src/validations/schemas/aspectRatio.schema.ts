import { z } from "zod";

const createAspectRatioSchema = z.object({
  aspectRatioName: z
    .string()
    .toLowerCase()
    .trim()
    .min(4, { message: "Name must be at least 4 characters long" })
    .max(20, { message: "Name must not exceed 20 characters" }),
  height: z.number(),
  width: z.number(),
});

const updateAspectRatioSchema = z.object({
  aspectRatioName: z
    .string()
    .toLowerCase()
    .trim()
    .min(4, { message: "Name must be at least 4 characters long" })
    .max(20, { message: "Name must not exceed 20 characters" })
    .optional(),
  height: z.number().optional(),
  width: z.number().optional(),
});

const aspectRatioIdSchema = z.object({
  aspectRatioId: z.string(),
});

export {
  createAspectRatioSchema,
  updateAspectRatioSchema,
  aspectRatioIdSchema,
};
