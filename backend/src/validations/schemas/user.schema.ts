import { z } from "zod";

const userRegisterSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .trim()
    .min(4, { message: "Username must be at least 4 characters long." })
    .max(20, { message: "Username must not exceed 20 characters" }),
  email: z.string().trim().email({ message: "Email invalid" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      {
        message:
          "At least 8 characters long one uppercase one lowercase one number one special character",
      }
    ),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

const userSignInSchema = z.object({
  username: z.string().optional(),
  email: z.string().email({ message: "Email invalid" }).optional(),
  password: z.string(),
});

const accountDetailUpdateSchema = z.object({
  phoneNumber: z.number().optional(),
  countryCode: z
    .string()
    .min(2, { message: "Invalid code" })
    .max(4, { message: "Invaild code" })
    .optional(),
  fullName: z.string().trim().optional(),
});

const assignRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

const tokenSchema = z.object({
  userId: z.string(),
});

const forgotPasswordRequestSchema = z.object({
  email: z.string().email({ message: "Email invalid" }),
});

export {
  userRegisterSchema,
  userSignInSchema,
  accountDetailUpdateSchema,
  assignRoleSchema,
  tokenSchema,
  forgotPasswordRequestSchema,
};
