import { site } from "@/lib/site";

export function ContactDetails({ className = "" }: { className?: string }) {
  return (
    <ul className={`space-y-2 text-sm ${className}`}>
      <li>
        <a href={`mailto:${site.email}`} className="font-medium hover:text-accent">{site.email}</a>
      </li>
      <li>
        <a href={site.phoneHref} className="font-medium hover:text-accent">{site.phone}</a>
      </li>
      <li className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
        {site.socials.map((s) => (
          <a key={s.href} href={s.href} className="text-muted hover:text-accent" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </li>
    </ul>
  );
}
