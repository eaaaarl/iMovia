import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(4, "Name must be at least 4 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type signUpValues = z.infer<typeof signUpSchema>;
