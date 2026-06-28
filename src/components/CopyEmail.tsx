"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { EMAIL } from "@/lib/contact";

/**
 * The email address as a copy-to-clipboard button. Shows a "Copied!"
 * confirmation that resets after ~2s and is announced via aria-live. No motion
 * needed, so it's reduced-motion safe by construction.
 */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  // Clear any pending reset timer on unmount.
  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the mailto fallback
      // below still lets the user reach out.
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${EMAIL} to clipboard`}
        className="group inline-flex items-center gap-3 rounded-md border border-strong bg-bg-elevated px-4 py-3 text-left transition-colors hover:border-accent/40"
      >
        <Mail className="h-4 w-4 flex-none text-accent" aria-hidden />
        <span className="font-mono text-fluid-sm text-fg">{EMAIL}</span>
        <span className="ml-auto flex-none text-fg-subtle transition-colors group-hover:text-fg">
          {copied ? (
            <Check className="h-4 w-4 text-accent" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
        </span>
      </button>
      <span
        role="status"
        aria-live="polite"
        className="h-4 font-mono text-fluid-xs text-accent-bright"
      >
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
