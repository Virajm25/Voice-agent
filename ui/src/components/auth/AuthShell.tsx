// Shared two-column auth shell, used by BOTH the Stack Auth handler
// (/handler/[...stack], hosted) and the local auth pages (/auth/login,
// /auth/signup). LEFT (lg+ only): a brand panel with the logo, headline and
// proof points,.
// RIGHT: the form card (`children`). Mobile collapses to the single form
// column. The form column scrolls and stays centered so tall (sign-up) forms
// never clip on short viewports.

import type { ReactNode } from "react";

import { BrandLogo } from "@/components/BrandLogo";

const HIGHLIGHTS = [
  { title: "Live in minutes", body: "Design a call flow visually and test it in your browser." },
  { title: "Bring your own stack", body: "Mix any speech, language and voice provider per agent." },
  { title: "Built for scale", body: "Run outbound campaigns and inbound lines from one place." },
];

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full bg-background lg:grid-cols-[46%_54%]">
      {/* Brand panel (LEFT) — hidden on mobile */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[oklch(0.2_0.09_277)] p-10 text-white lg:flex xl:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 size-[30rem] rounded-full bg-[oklch(0.55_0.23_277)] opacity-40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-[-8rem] size-[32rem] rounded-full bg-[oklch(0.72_0.14_195)] opacity-25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative">
          <BrandLogo inverse className="h-9" />
        </div>

        <div className="relative max-w-md space-y-8">
          <div className="auth-waveform">
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight xl:text-5xl">
            Give every caller a great first impression.
          </h1>
          <ul className="space-y-4">
            {HIGHLIGHTS.map((point) => (
              <li key={point.title} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[oklch(0.78_0.13_195)]" />
                <p className="text-sm leading-relaxed text-white/70">
                  <span className="font-semibold text-white">{point.title}.</span>{" "}
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Form column (RIGHT) */}
      <main className="flex min-h-screen flex-col overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md space-y-6 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
            {/* Mobile-only logo (brand panel is hidden) */}
            <div className="lg:hidden">
              <BrandLogo className="h-8" />
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
