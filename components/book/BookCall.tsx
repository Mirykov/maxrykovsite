"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import site from "@/content/site.json";
import { bookCallSchema, callTypes, HONEYPOT_FIELD, type CallType } from "@/lib/inquiry";
import { buttonClasses } from "@/components/og/Button";
import Burst from "@/components/og/Burst";
import ImagePlaceholder from "@/components/ImagePlaceholder";

type Errors = Partial<Record<"name" | "email" | "callType" | "form", string>>;

const steps = ["Tell us who you are", "Pick a time"];

function calendlyUrl(type: CallType, name: string, email: string) {
  const base = site.calendly[type];
  if (!base) return null;
  const url = new URL(base);
  url.searchParams.set("name", name);
  url.searchParams.set("email", email);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("primary_color", "b11f25");
  return url.toString();
}

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border-2 bg-white px-4 py-3 text-base outline-none focus-visible:border-og-teal-dark ${
    invalid ? "border-og-red" : "border-og-ink/15"
  }`;

export default function BookCall({ initialType }: { initialType: CallType | null }) {
  const [callType, setCallType] = useState<CallType | null>(initialType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move keyboard/screen-reader focus to the new step's heading when the step changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeading.current?.focus();
  }, [step]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget).get(HONEYPOT_FIELD);
    const payload = { formType: "book-call" as const, name, email, callType, [HONEYPOT_FIELD]: honeypot };

    const check = bookCallSchema.safeParse(payload);
    if (!check.success) {
      const next: Errors = {};
      for (const issue of check.error.issues) {
        const field = issue.path[0] as keyof Errors;
        next[field] ??= field === "callType" ? "Please choose what the call is about." : issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 400 || res.status === 429) {
        const body = await res.json().catch(() => ({}));
        setErrors({ ...(body.fieldErrors ?? {}), form: body.error });
        return;
      }
      // Any other failure (e.g. email not set up yet) shouldn't stop someone from booking
    } catch {
      // Network hiccup: still let them pick a time
    } finally {
      setSubmitting(false);
    }
    setStep(2);
  }

  const chosen = callType ? callTypes[callType] : null;
  const calendar = step === 2 && callType ? calendlyUrl(callType, name, email) : null;

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-og-ink/10 bg-white">
      {/* Progress */}
      <ol className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-b-2 border-og-ink/10 px-4 py-4 text-sm font-semibold">
        {steps.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const current = step === n;
          return (
            <li key={label} aria-current={current ? "step" : undefined} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                  current ? "bg-og-red text-white" : done ? "bg-og-teal text-og-ink" : "bg-og-ink/10 text-og-ink/60"
                }`}
              >
                {done ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : n}
              </span>
              <span className={current ? "text-og-ink" : "text-og-ink/60"}>
                {label}
                {done && <span className="sr-only"> (done)</span>}
              </span>
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-7 p-6 sm:p-10">
          <h2 ref={stepHeading} tabIndex={-1} className="font-display text-2xl font-bold outline-none">
            Step 1: Tell us who you are
          </h2>

          <fieldset>
            <legend className="mb-3 font-semibold">What&rsquo;s the call about?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(callTypes) as CallType[]).map((key) => {
                const t = callTypes[key];
                const selected = callType === key;
                return (
                  <label
                    key={key}
                    className={`relative flex cursor-pointer flex-col gap-1 rounded-2xl border-2 p-5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-og-teal-dark ${
                      selected ? "border-og-red bg-og-red/5" : "border-og-ink/15 hover:border-og-ink/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="callType"
                      value={key}
                      checked={selected}
                      onChange={() => setCallType(key)}
                      className="sr-only"
                      aria-describedby={errors.callType ? "callType-error" : undefined}
                    />
                    <span className="pr-8 text-lg font-bold">&ldquo;{t.label}&rdquo;</span>
                    <span className="text-sm text-og-ink/70">{t.minutes}-minute call</span>
                    {selected && (
                      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-og-red text-white">
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
            {errors.callType && (
              <p id="callType-error" className="mt-2 text-sm font-semibold text-og-red">
                {errors.callType}
              </p>
            )}
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block font-semibold">
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass(Boolean(errors.name))}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm font-semibold text-og-red">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(Boolean(errors.email))}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm font-semibold text-og-red">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Spam trap: hidden from people, tempting to bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={HONEYPOT_FIELD}>Leave this empty</label>
            <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
          </div>

          {errors.form && (
            <p role="alert" className="rounded-xl bg-og-red/10 px-4 py-3 font-semibold text-og-red">
              {errors.form}
            </p>
          )}

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={submitting} className={buttonClasses("primary", "disabled:opacity-60")}>
              <Burst className="pointer-events-none absolute -left-4 -top-4 h-7 w-7" />
              {submitting ? "One sec…" : "Continue to calendar"}
              {!submitting && <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />}
            </button>
            <p className="text-sm text-og-ink/60">We&rsquo;ll only use this to follow up about your event.</p>
          </div>
        </form>
      ) : (
        <div className="p-6 sm:p-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 ref={stepHeading} tabIndex={-1} className="font-display text-2xl font-bold outline-none">
                Step 2: Pick a time
              </h2>
              {chosen && (
                <p className="mt-1 text-og-ink/70">
                  &ldquo;{chosen.label}&rdquo; &middot; {chosen.minutes} min
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 font-semibold text-og-teal-dark underline underline-offset-4"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Change details
            </button>
          </div>

          {calendar ? (
            <iframe
              src={calendar}
              title={`Calendar to book a ${chosen?.minutes}-minute call`}
              className="h-[720px] w-full rounded-2xl border-0"
            />
          ) : (
            <ImagePlaceholder
              tone="teal"
              label={`[CALENDLY: “${chosen?.label}” · ${chosen?.minutes} min — calendar appears here once Max's link is added]`}
              className="h-[420px] w-full rounded-2xl"
            />
          )}
        </div>
      )}

      <p className="border-t-2 border-og-ink/10 px-6 py-4 text-center text-sm">
        Prefer email?{" "}
        <Link href="/plan" className="font-semibold text-og-teal-dark underline underline-offset-4">
          Send us the details.
        </Link>
      </p>
    </div>
  );
}
