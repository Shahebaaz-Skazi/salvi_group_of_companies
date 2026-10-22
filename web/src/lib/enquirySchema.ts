/**
 * Zod schema for the /api/enquiry endpoint.
 * Keep this file import-free of server-only modules — it is also used
 * client-side for pre-validation if needed.
 */
import { z } from "zod";

const INDIAN_PHONE = /^(?:\+91)?[6-9]\d{9}$/;

export const enquirySchema = z.object({
  /** Routing key → maps to a destination email env var */
  type: z.enum(["hire-manpower", "training", "fish-enquiry", "general"]),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .trim(),

  phone: z
    .string()
    .regex(INDIAN_PHONE, "Enter a valid 10-digit Indian mobile number")
    .transform((v) => v.replace(/^\+91/, "")), // normalise: strip prefix

  email: z
    .string()
    .email("Enter a valid email address")
    .max(254)
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .max(1000, "Message must be under 1000 characters")
    .trim(),

  /** Must be true — user confirmed consent */
  consent: z.literal(true, {
    error: "You must consent to data processing",
  }),

  // ── Anti-spam fields ────────────────────────────────────────────────────
  /** Honeypot: must be empty. Hidden from real users via CSS. */
  website: z.string().max(0, "Bot detected").optional(),

  /** Unix ms when the form was first rendered; must be >4 s ago */
  _t: z
    .string()
    .refine((v) => {
      const age = Date.now() - Number(v);
      return age >= 4_000 && age <= 30 * 60_000; // 4 s – 30 min window
    }, "Submission timing invalid"),

  /** Optional resume file attachment (Careers application) */
  resume: z
    .object({
      filename: z.string().min(1).max(150),
      content: z.string().min(1), // base64 encoded
      contentType: z.string().optional(),
    })
    .optional(),
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;
