"use client";

import dynamic from "next/dynamic";

/**
 * Skeleton shown while the real form's JS loads. It mirrors the form's field
 * layout (two inputs, a textarea, a button) at matching heights so the swap
 * doesn't shift layout. Purely decorative — hidden from assistive tech.
 */
function FormSkeleton() {
  const field = "rounded-md border border-strong bg-bg-elevated";
  return (
    <div className="flex animate-pulse flex-col gap-5" aria-hidden>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-16 rounded bg-bg-elevated" />
        <div className={`h-12 w-full ${field}`} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-16 rounded bg-bg-elevated" />
        <div className={`h-12 w-full ${field}`} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-24 rounded bg-bg-elevated" />
        <div className={`h-[136px] w-full ${field}`} />
      </div>
      <div className="h-[42px] w-40 rounded-md bg-accent/60" />
    </div>
  );
}

/**
 * The contact form is below the fold and purely interactive, and it pulls in
 * react-hook-form + zod + resolvers. Loading it with next/dynamic (ssr: false)
 * keeps that validation stack out of the initial homepage bundle; the skeleton
 * above reserves the space so there's no layout shift when it swaps in.
 */
export const ContactFormLazy = dynamic(
  () => import("@/components/ContactForm").then((m) => m.ContactForm),
  { ssr: false, loading: () => <FormSkeleton /> },
);
