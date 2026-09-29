import { ViewTransition, type ReactNode } from "react";

// Wraps each page so route changes fade and lift (CSS in globals.css).
// Must live in page.tsx, not a layout: layouts persist, so enter/exit never fire there.
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

// Shared-element morph: the same name on two pages makes the element glide between them.
export function Morph({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
