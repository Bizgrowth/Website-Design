const tools = [
  "Make.com", "n8n", "Claude", "HubSpot", "QuickBooks", "Gmail", "Slack", "Supabase",
  "Airtable", "Notion", "Google Sheets", "Relevance AI", "Salesforce", "Zapier",
];

// Endless strip of the tools the blueprints are built on.
export function ToolMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 gap-3 pr-3" aria-hidden={hidden || undefined}>
      {tools.map((t) => (
        <li key={t} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
