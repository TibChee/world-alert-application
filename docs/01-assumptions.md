# Requirements Analysis and Assumptions

These assumptions were proposed during AI-assisted
planning and reviewed against the original brief.

They define the intentionally limited scope of the
four-hour MVP.

## Assumptions and review flags

| Ambiguity                | Assumption for this timebox                                                                                                                                                     | Rationale and risk                                                                             | Human review                                                        |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| “Important” and matching | User selects an event category and may specify a case-insensitive keyword. A rule matches only if its category matches and its optional keyword occurs in the event title/text. | Deterministic and testable, but only a narrow interpretation of importance.                    | Accepted for a demo.                                                |
| Event source             | The user manually submits an event; no live feed or seed data is required.                                                                                                      | Proves matching without data-source setup. It does not demonstrate monitoring of world events. | Manual entry is acceptable for MVP.                                 |
| Channels                 | Simulated local previews, explicitly marked as not sent; this choice is confirmed.                                                                                              | No credentials or external services needed. It does not prove real-world delivery.             | Accepted for MVP.                                                   |
| Admin view               | Read-only list of entered events and associated preview/status.                                                                                                                 | Satisfies a minimal visible admin surface and the README context.                              | Accepted as the intended minimum.                                   |
| Users and persistence    | One local user and in-memory state; a page reload resets the demo.                                                                                                              | Avoids identity and storage work.                                                              | Accepted for the local MVP.                                         |
| Future channels          | Keep only a tiny formatter/dispatch seam, not a plugin system.                                                                                                                  | Satisfies the extension intent without spending time on unused architecture.                   | Accepted. A minimal dispatch abstraction is sufficient for the MVP. |
