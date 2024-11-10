import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string().min(1, "name is required"),
  lastname: z.string().min(1, "last name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});
