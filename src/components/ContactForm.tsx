"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contactSchema";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { EASE, DURATION } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FIELD_CLASS =
  "w-full rounded-md border border-strong bg-bg-elevated px-4 py-3 text-fluid-sm text-fg transition-colors placeholder:text-fg-subtle focus:border-accent";

const LABEL_CLASS = "text-fluid-sm font-medium text-fg";

/**
 * Contact form (client): react-hook-form + zodResolver against the shared
 * schema, posting to /api/contact. Drives idle → submitting → success / error
 * states. Motion is gated on prefers-reduced-motion.
 */
export function ContactForm() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError(
        "Couldn't reach the server. Check your connection and try again.",
      );
    }
  }

  // Subtle entrance for the swapped-in panels; instant under reduced motion.
  const panelMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: DURATION.base, ease: EASE },
      };

  if (status === "success") {
    return (
      <motion.div
        {...panelMotion}
        className="flex flex-col items-start gap-4 rounded-lg border border-strong bg-bg-elevated p-8 shadow-glow"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h3 className="font-display text-fluid-xl font-semibold tracking-tight text-fg">
            Message sent
          </h3>
          <p className="mt-2 text-fluid-sm text-fg-muted">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline rounded-sm text-fluid-sm font-medium text-accent-bright transition-colors hover:text-fg"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Honeypot: off-screen, hidden from a11y tree + tab order. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={LABEL_CLASS}>
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(FIELD_CLASS, errors.name && "border-danger")}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-fluid-xs text-danger">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL_CLASS}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(FIELD_CLASS, errors.email && "border-danger")}
          {...register("email")}
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="text-fluid-xs text-danger"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={LABEL_CLASS}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project, role, or idea…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            FIELD_CLASS,
            "resize-y",
            errors.message && "border-danger",
          )}
          {...register("message")}
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="text-fluid-xs text-danger"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Server / network error (retryable). */}
      {status === "error" && serverError && (
        <motion.p
          {...panelMotion}
          role="alert"
          className="flex items-center gap-2 rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-fluid-sm text-fg-muted"
        >
          <AlertCircle className="h-4 w-4 flex-none text-danger" aria-hidden />
          {serverError}
        </motion.p>
      )}

      {/* Primary CTA with a soft violet glow that warms on hover. */}
      <div className="group relative inline-flex self-start">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-accent opacity-30 blur-lg transition-opacity duration-300 group-hover:opacity-60"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-fluid-sm font-medium text-white shadow-glow transition-colors duration-200 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Send message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
