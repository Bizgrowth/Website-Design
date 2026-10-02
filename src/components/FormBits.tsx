import type { ReactNode } from "react";

export const inputCls = "min-h-11 w-full rounded-xl border border-line bg-surface-2 px-3 py-2 text-sm outline-none focus:border-accent";

export function Field({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">
        {label}
        {optional && <span className="font-normal text-faint"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}

// A field real visitors never see or fill in. Bots usually do, which tells the server to ignore the submission.
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export const errorFor = (status: number, message?: string, fallback = "Something went wrong. Please try again.") =>
  status === 429
    ? "You're sending quickly. Please wait a few minutes and try again."
    : status === 503
      ? "Email is offline right now. Please book a call instead."
      : message || fallback;
