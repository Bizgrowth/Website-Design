# AI Solutions Guide (chat agent): setup

The chat agent is the "Ask the AI guide" button on every page. It answers from the site's own content, searches a fixed list of trusted AI sources for current news, and emails Daniel when a visitor asks to be contacted.

## Where the keys go

Never put keys in the code or in GitHub. Add them as **environment variables in your hosting provider** (for Vercel: Project → Settings → Environment Variables), then redeploy.

| Variable | Required | What it is |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | From console.anthropic.com → API Keys. Powers the agent. |
| `RESEND_API_KEY` | Yes, for lead emails | From resend.com → API Keys. Sends the lead alert email. |
| `LEAD_TO_EMAIL` | No | Where lead alerts go. Defaults to the email in `src/lib/site.ts`. |
| `LEAD_FROM_EMAIL` | No | Sender, for example `AI Ops Expert Chat <chat@aiopsexpert.com>`. Needs your domain verified in Resend. Until then the default test sender only delivers to the Resend account owner's email. |
| `CHAT_MODEL` | No | Defaults to `claude-opus-5-5`. Set `claude-sonnet-5-5` for roughly half the cost. |

Without `ANTHROPIC_API_KEY` the button still appears, and visitors see a friendly "offline" message with your booking link. Without `RESEND_API_KEY` the agent chats normally but tells visitors to email you instead of claiming a lead was sent.

## One-time setup in the Anthropic Console

1. **Set a monthly spend limit** (Settings → Limits). This is the real protection against abuse.
2. **Enable web search** for the organization (Settings → Privacy or Tools). The agent uses it for "what's new in AI" answers. Without it, the agent still answers everything from the site's own content.

## Keeping it up to date

- **Site knowledge** rebuilds from `content/` and `src/lib/` on every deploy. Publish a blueprint, guide, or update and the agent knows it after the next deploy.
- **Trusted web sources** are in `src/lib/chat/sources.ts`. Add or remove a domain there.
- **Rules and tone** are in `src/lib/chat/prompt.ts`.

## Guardrails built in

- Never invents client results, statistics, or client names. Blueprints and apps are described as reference builds and demos.
- Quotes only the published "from" prices.
- Asks for explicit permission before sending anyone's details, and never claims a lead was sent unless the email was accepted.
- Never asks for passwords, payment, or health information.
- Limits: 25 messages per visitor per 10 minutes, 16 messages of history, 1,500 characters per message.

## Before going live

- Add a privacy policy page and link it from the chat panel. The chat processes visitor messages with an AI service and emails contact details.
- Send yourself a test lead and confirm the email arrives.
