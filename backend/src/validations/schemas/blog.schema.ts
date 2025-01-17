import { z } from "zod";

const createBlogSchema = z.object({
  fileName: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(15, { message: "Username must not exceed 15 characters" }),
  title: z
    .string()
    .trim()
    .min(10, { message: "Title must be at least 10 characters long" })
    .max(150, { message: "Title must not exceed 150 characters" }),
  summary: z
    .string()
    .trim()
    .min(50, { message: "Summary must be at least 50 characters long" })
    .max(250, { message: "Summary must not exceed 250 characters" }),
  aspectRatio: z.string(),
  backgroundColor: z.string(),
});

const updateBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, { message: "Title must be at least 10 characters long" })
    .max(150, { message: "Title must not exceed 150 characters" })
    .optional(),
  summary: z
    .string()
    .trim()
    .min(50, { message: "Summary must be at least 50 characters long" })
    .max(250, { message: "Summary must not exceed 250 characters" })
    .optional(),
});

const blogIdSchema = z.object({
  blogId: z.string(),
});

export { createBlogSchema, updateBlogSchema, blogIdSchema };
