import { z } from "zod";

export const UserValidation = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username is required" })
    .max(12),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(30, { message: "Password cannot exceed 30 characters" }),
});

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
