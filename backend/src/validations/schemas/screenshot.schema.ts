import { z } from "zod";

const createScreenshortSchema = z.object({
  fileName: z.string().toLowerCase().max(15).default("untitled file"),
});

const imageSchema = z.object({
  url: z.string(),
  publicId: z.string(),
});

const screenshortIdSchema = z.object({
  screenshortId: z.string(),
});

export { createScreenshortSchema, imageSchema, screenshortIdSchema };
