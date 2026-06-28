import { z } from "zod";

/**
 * Contact form schema, shared by the client form (react-hook-form + zodResolver)
 * and the API route so validation rules stay in exactly one place.
 *
 * `company` is a honeypot: real users never see it, so any value means a bot.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (at least 10 characters).")
    .max(2000, "That's a bit long — please keep it under 2000 characters."),
  /** Honeypot — must stay empty. */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
