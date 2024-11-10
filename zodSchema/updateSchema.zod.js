import { z } from "zod";

export const updateSchema = z.object({
  firstname: z.string().min(1, "name is required").optional(),
  lastname: z.string().min(1, "last name is required").optional(),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters long")
    .optional(),
});
