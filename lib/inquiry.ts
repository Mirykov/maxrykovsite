import { z } from "zod";

// One schema per form, all posted to /api/inquiry and tagged by `formType`.
// The `plan` and `emcee` schemas are ready for the /plan and /emcee forms.

const text = (max = 200) => z.string().trim().max(max);
const required = (label: string, max = 200) => text(max).min(1, `Please add your ${label}.`);
const email = z.string().trim().pipe(z.email("Please enter a valid email address."));

export const callTypes = {
  host: { label: "I need a host", minutes: 15 },
  custom: { label: "I want to create something custom", minutes: 30 },
} as const;
export type CallType = keyof typeof callTypes;

export const bookCallSchema = z.object({
  formType: z.literal("book-call"),
  name: required("name"),
  email,
  callType: z.enum(["host", "custom"]),
});

export const planSchema = z.object({
  formType: z.literal("plan"),
  name: required("name"),
  email,
  organization: text().optional(),
  interest: z.enum(["Game show", "Custom event", "Emcee", "Creative campaign", "Not sure yet"]),
  timeframe: text().optional(),
  location: text().optional(),
  audienceSize: text().optional(),
  budget: z.enum(["Under $1,500", "$1,500–$3,000", "$3,000–$6,000", "$6,000+", "Not sure"]).optional(),
  goals: text(4000).optional(),
});

export const emceeSchema = z.object({
  formType: z.literal("emcee"),
  name: required("name"),
  email,
  organization: text().optional(),
  eventDate: text().optional(),
  location: text().optional(),
  eventType: text().optional(),
  audienceSize: text().optional(),
  hostNotes: text(4000).optional(),
  budget: text().optional(),
});

export const inquirySchema = z.discriminatedUnion("formType", [bookCallSchema, planSchema, emceeSchema]);
export type Inquiry = z.infer<typeof inquirySchema>;

// Hidden field real visitors never see; bots that fill it are dropped silently.
export const HONEYPOT_FIELD = "website";
