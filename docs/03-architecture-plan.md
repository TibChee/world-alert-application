# Architecture: Local Single-Page Prototype

## Chosen shape

- Static `index.html` and `app.js`; no framework, build step, backend, database, external dependency, or network API.
- In-memory arrays hold alert rules, submitted events, and simulated notification records. Reloading the page resets the demo.
- Rule matching is a pure function: category must match; an empty keyword matches all events in that category; otherwise a case-insensitive substring must occur in the event title or text.
- A small channel dispatch map creates an email preview and a Slack-style message payload. Both carry the status `Simulated - not sent`.
- The same page contains the rule form, manual event form, and read-only admin activity view.

## Why

The repository had no application source or dependency manifest, and the approved scope has a strict four-hour limit. A static page keeps the full alert-to-admin flow demonstrable without setup infrastructure and leaves the matching/formatting logic directly testable. Separate channel formatters provide the minimum extension seam needed without adding a plugin architecture.

## Deliberate limitations

No live event discovery, external delivery, authentication, persistence, real admin privileges, retries, or production guarantees. This is a local prototype; simulated status must not be presented as a successful external send.