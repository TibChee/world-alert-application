# Revised MVP Plan: Strict 4-Hour Budget

## Purpose and boundary

This revision replaces the prior 24-hour proposal. The four-hour cap includes planning, implementation, review and testing, documentation, and Git commits. This plan defines the approved scope for the four-hour MVP. Implementation will begin after the assumptions and acceptance criteria are reviewed. The confirmed constraint is that local simulated email/Slack previews are acceptable; real external sends are not required.

## Requirements stated in the assignment

- Users can set up alerts and get notified when something important happens in the world.
- Examples are breaking news, market movements, and natural disasters; they are examples, not required integrations or a complete event taxonomy.
- Email and Slack are required channels, and the design should allow more channels later.
- An admin view is required.
- Any language/framework may be used; the brief defines no stack, event data source, event detection, rule schema, or wireframes.
- The assignment suggests 24 hours, but emphasizes a partial, reasoned solution and visible process over completeness. This revised plan instead obeys the request's strict four-hour cap.
- The repository submission must contain meaningful commits for major milestones, all prompts, process artifacts, and the planned deliverables. AI-generated work must be critically reviewed, with checks, rejected suggestions, and corrections surfaced.

## Repository context (not a brief requirement)

The README describes rule creation, matching events, and an admin view of events/delivery status. Treat that as context, not as additional assignment text. There is no visible application source or dependency manifest; existing process-document headings are mostly empty. There is an unrelated untracked office lock file in the working tree; leave it untouched. No authentication, role separation, or privileged access is implemented. 

## Scope

### Must Have

- One local, single-user demonstration flow. A user creates a simple rule with a category, optional case-insensitive keyword, and email and/or Slack selection. Keywords use case-insensitive substring matching against the concatenated event title and text. Empty keywords match every event in the selected category.
- A user enters an event manually (category, title, and text). A deterministic matcher evaluates it immediately against the created rule.
- Matching events produce clearly labeled, simulated email and/or Slack previews. The two channel formatters are separate, behind a tiny dispatch map/function so another channel can be added without an architecture framework.
- A basic, read-only admin area shows submitted events and their resulting simulated notification previews/status.
- A concise run guide, documented assumptions/decisions, prompt history, validation/review notes, meaningful milestone commits, and a small set of automated checks for the core behavior.
- The admin view is a clearly labeled, read-only section of the local application.

### Nice to Have (only after every Must Have works)

- A one-click sample scenario that fills or submits a sample rule/event.
- Edit/delete rules or clear/reset the demo state.
- Slight visual polish or persistence across reloads.

### Out of Scope

- Live news, financial, or disaster-event ingestion; automatic “importance” classification; AI/ML; complex rule syntax.
- Real email/Slack delivery, credentials, paid services, or any external API.
- Backend, database, accounts, authentication/authorization, multi-tenancy, deployment, or production reliability.
- Retries, scheduling/digests, analytics, extensive admin actions, and a general-purpose plugin framework.
- Nice-to-have items if they threaten the four-hour cap, core tests, review, documentation, or commits.

## Smallest architecture recommendation

Use one static, no-build page in plain HTML/CSS/JavaScript, with in-memory state and no external dependencies. Keep rule matching as a small pure function. Use two small functions to create the email preview and Slack payload, called through a minimal channel dispatch map. Render the rule form and basic admin event/outcome list in the same page. Do not create a server, database, abstraction layers, or configuration system. Prefer an already-present local test runner; if Node.js is available, use its built-in test runner for the pure matching/formatting logic. Do not install dependencies during this timebox.

This is a recommendation rather than an assignment requirement. If a runnable application stack unexpectedly exists, use it only if doing so is faster than introducing this no-build approach.

## Measurable acceptance criteria

These are recommended interpretations, not requirements specified in the assignment:

1. A user can create a rule through the UI and select email, Slack, or both.
2. Submitting an event with the same category and, when configured, matching keyword produces exactly one visibly simulated preview for each selected channel.
3. Submitting a category mismatch or a keyword non-match produces no notification preview.
4. The email and Slack previews have distinguishable, channel-appropriate content and are never labeled as externally sent.
5. The admin area displays the submitted event and its associated preview(s), or clearly shows no match.
6. Automated tests cover category match/mismatch, optional keyword match/mismatch, and both channel formatters/dispatch; the tester also completes one end-to-end UI walkthrough.
7. A reviewer can run the demo using the documented local instructions without network access, service credentials, or paid dependencies.
8. The prompt/review/validation notes identify at least one concrete AI-generated output that was checked, and record any correction or state explicitly if none required correction. The actual result must be reported honestly.
9. The final diff is reviewed and the major plan, implementation, and validation/documentation milestones are committed with meaningful messages, within the four-hour total.

## Four-hour execution plan (240 minutes total)

|                Time | Phase and deliverables                                                                                                                                                                                                                                                          | Checkpoint / commit                                                                                                       |
|--------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
|  0:00–0:20 (20 min) | **Plan and inspect:** confirm the Must Have slice, check the available runtime/test runner and current repository state, record assumptions and acceptance checks.                                                                                                              | Keep setup decisions to the smallest runnable path; commit the scoped plan/decision note as the planning milestone.       |
| 0:20–2:20 (120 min) | **Implement vertical slice:** single page; rule creation; manual event entry; deterministic matching; simulated email/Slack output; basic admin event/outcome view. No Nice-to-Have work until the whole path works.                                                            | Walk through rule → matching event → both selected previews → admin view. Commit the working slice after a diff review.   |
|  2:20–3:05 (45 min) | **Critical AI review and validation:** inspect generated code for incorrect matching, missing empty/invalid input handling, misleading delivery status, and unnecessary complexity. Add/run focused automated tests and do an end-to-end UI walkthrough; fix material failures. | Record exact test commands/results, review findings, and corrections or rejected suggestions. Do not hide failing checks. |
|  3:05–3:35 (30 min) | **Document:** local run steps, explicit limits/assumptions, decisions, prompt history, and concise validation/review notes.                                                                                                                                                     | Ensure docs describe simulated sends and manual event entry as limitations, not live capabilities.                        |
|  3:35–4:00 (25 min) | **Final verification and commits:** fresh local start, repeat the core acceptance walkthrough, inspect status/diff, make final documentation/validation milestone commit(s).                                                                                                    | Stop at four hours. Record incomplete criteria rather than extending scope or time.                                       |

The schedule totals exactly 240 minutes. Commit preparation and execution are included in the phase allocations, not additional time. Target no more than three meaningful milestone commits; avoid per-file or cosmetic commits.

## Key risks and mitigations

- **Time overrun from setup or framework choice:** no app stack is present. Use a no-build page and available tools; spend at most the initial 20 minutes on environment checks.
- **False impression of live monitoring or delivery:** clearly label manual events and simulated previews in the UI and docs.
- **A UI-only demo hides matching bugs:** isolate the matcher and channel formatting as small testable functions and test those directly.
- **AI-generated code appears plausible but is wrong or overbuilt:** review the actual diff against the acceptance criteria, run tests and the walkthrough, and document corrections rather than trusting generated claims.
- **Documentation and commits get squeezed out:** reserve the explicit 30-minute documentation block and final 25-minute verification/commit block; cut all Nice-to-Haves first.
- **In-memory state is lost on reload:** state this in the run guide; persistence is a Nice-to-Have, not a reason to add storage infrastructure.

## Final Scope Approval

The four-hour MVP scope has been reviewed and accepted.

The implementation will provide a local prototype supporting rule creation, manual event submission, deterministic matching, simulated email and Slack notification previews, and a read-only admin view.

Manual event submission and ephemeral in-memory state are explicitly accepted limitations.

Implementation may proceed according to the milestones and acceptance criteria defined above.