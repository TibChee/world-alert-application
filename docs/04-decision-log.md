# Decision Log

### decision #1 - Reduce MVP Scope to a 4-Hour Timebox

**Context**: The initial Copilot planning prompt requested an MVP based on the assignment's suggested 24-hour timeframe. \
**Decision**: I instructed Copilot to revise the implementation plan for a strict four-hour budget, including planning, development, testing, documentation, and Git commits. \
**Rationale**: A smaller, validated end-to-end prototype with documented AI-assisted decisions is preferable to a broader implementation that cannot be properly reviewed or tested.

### decision #2 - Use a static local prototype

**Context**: The repository had no application source or dependency manifest, and the approved scope capped all work at four hours. \
**Decision**: Implement one static HTML/CSS/JavaScript page with in-memory state and no package dependencies. \
**Rationale**: This is the shortest path to a working rule-to-event-to-admin flow and avoids infrastructure that the brief does not require.

### decision #3 - Use deterministic manual event matching and simulated delivery

**Decision**: Users manually enter events. A rule matches category and an optional case-insensitive keyword substring in the title or event text. Matching rules create local Email/Slack previews labeled `Simulated - not sent`. \
**Rationale**: The assignment gives no event source or credentials; deterministic matching and explicit simulation are reproducible and honest about prototype limits.

### decision #4 - Use a browser test page rather than adding a test dependency

**Context**: Node.js and package manifests were not available in the environment; Chrome was available. \
**Decision**: Add `tests.html` with browser-based logic and iframe UI checks; run it in headless Chrome. \
**Rationale**: This exercises the actual browser JavaScript and forms without installing dependencies.

### decision #5 - Manually change file structure
**Context**: The initial file structure was not optimal for the prototype's needs. \
**Decision**: Moved the files into the frontend folder. \
**Rationale**: A better-organized file structure improves maintainability and makes it easier to understand the prototype's components.
