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

export { userRegisterSchema };
