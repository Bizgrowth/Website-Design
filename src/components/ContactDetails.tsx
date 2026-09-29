import { site } from "@/lib/site";

export function ContactDetails({ className = "" }: { className?: string }) {
  return (
    <ul className={`text-sm ${className}`}>
      <li>
        <a href={`mailto:${site.email}`} className="inline-flex min-h-10 items-center font-medium hover:text-accent">{site.email}</a>
      </li>
      <li>
        <a href={site.phoneHref} className="inline-flex min-h-10 items-center font-medium hover:text-accent">{site.phone}</a>
      </li>
      <li className="flex flex-wrap gap-x-4">
        {site.socials.map((s) => (
          <a key={s.href} href={s.href} className="inline-flex min-h-10 items-center text-muted hover:text-accent" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </li>
    </ul>
  );
}
