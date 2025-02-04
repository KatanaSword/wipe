import { z } from "zod";

const createTestimonialSchema = z.object({
  fileName: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "File name must be at least 4 characters long" })
    .max(15, { message: "File name must not exceed 15 characters" }),
  fullName: z
    .string()
    .trim()
    .min(4, { message: "Full name must be at least 4 characters long" })
    .max(20, { message: "Full name must not exceed 20 characters" }),
  stars: z.number().min(1, { message: "Star must be at least 1 start" }).max(5),
  testimonial: z
    .string()
    .min(50, { message: "Testimonial must be at least 50 characters long" })
    .max(250, { message: "Testimonial must not exceed 250 characters" }),
  aspectRatioName: z.string(),
  backgroundColorName: z.string(),
});

const updateTestimonialSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(4, { message: "Full name must be at least 4 characters long" })
    .max(20, { message: "Full name must not exceed 20 characters" }),
  stars: z.number().min(1, { message: "Star must be at least 1 start" }).max(5),
  testimonial: z
    .string()
    .min(50, { message: "Testimonial must be at least 50 characters long" })
    .max(250, { message: "Testimonial must not exceed 250 characters" }),
});

const testimonialIdSchema = z.object({
  testimonialId: z.string(),
});

export {
  createTestimonialSchema,
  updateTestimonialSchema,
  testimonialIdSchema,
};
