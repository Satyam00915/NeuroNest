import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(2, "Fullname must be atleast 2 characters"),
  username: z.string().min(5, "Username must be atleast 5 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, "Must be at least 8 characters in length"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type UserFormData = z.infer<typeof userSchema>;
