Devpost
Join a hackathon 
Host a hackathon 
Resources 
 
MS-Teja
Notifications
Loading...

The WebMCP Challenge
Deadline: Sep 4, 2026 @ 1:30am GMT+5:30 
Join hackathon
The WebMCP Challenge
Overview
My projects
Participants (1286)
Resources
Rules
Project gallery
Updates
Discussions
The WebMCP Challenge

10 days for exploring what’s possible with WebMCP

Join hackathon
Who can participate

Above legal age of majority in country of residence
Specific countries/territories excluded 
View full rules
8 days to deadline
View schedule
Deadline
Sep 4, 2026 @ 1:30am GMT+5:30 
Online
Public
$35,000 in cash	1286 participants
OpenAI
Devpost icon rgb30px
Managed by Devpost
Machine Learning/AI  E-commerce/Retail Web
WebMCP is an emerging open standard that lets websites expose structured tools agents can use directly. Instead of leaving agents to guess their way through your UI, you define exactly how they can use your app, so they complete tasks faster, more accurately, and more reliably.

The WebMCP Challenge invites you to build something we haven’t seen before: an app that becomes meaningfully better when people and their agents can use it together.

WHY JOIN

Explore what new experiences that become possible when web apps can be built for people and their agents.

Help shape an emerging open standard and the future of the agent-native web.

The top 10 submissions will each receive $3,000 in cash, one Codex Micro, ChatGPT Pro for one year, OpenAI merch, and additional prizes from challenge supporters, subject to the official rules.

GET STARTED

Learn what WebMCP enables. Read the WebMCP specification and Chrome’s developer documentation to understand how websites can expose tools to AI agents.

Get inspired. Explore the WebMCP Showcase for examples of agent-native apps and ideas for what you could build, and read the WebMCP guide from OpenAI.

Build and deploy. Create a new WebMCP-enabled app or add WebMCP support to an existing one. Host it on ChatGPT Sites, Cloudflare, Vercel, Render, Netlify, Shopify, or any deployment platform you choose.

Test your app. Open your deployed app in ChatGPT’s in-app browser, which supports WebMCP out of the box. To test in Google Chrome, enable WebMCP using chrome://flags/#enable-webmcp-testing.

 

Meet the Devpost plugin 

The Devpost Hackathons plugin runs inside Codex and includes everything you need to participate—from challenge requirements and rules to the submission flow. It can help you brainstorm ideas, plan your project, and prepare your submission without leaving Codex.



REQUIREMENTS
WHAT TO BUILD

Build a WebMCP-powered web app that imagines and explores the future of the open web—where humans and agents can interact, collaborate, and create together.

WHAT TO SUBMIT

Provide a working live URL that judges can access using ChatGPT’s in-app browser or Google Chrome with WebMCP enabled. 
You may host your application on ChatGPT Sites, Cloudflare, Vercel, Render, Netlify, or any other provider of your choice. You may also authenticate your application if you wish. If so, you can add the credentials on the Submission Form.
Text description that explains:
Why your use case is a strong fit for WebMCP 
How it creates a better user experience
Describe what people and agents can do together that was difficult or impossible before
Briefly explain how you implemented WebMCP
A demo video. A <3-minute public YouTube video showing a clear demo with audio that covers what you built and how you used WebMCP
URL to your public code repository (on GitHub, GitLab and Bitbucket) that must contain: 
All necessary source code, assets, and instructions required for the project to be functional
Must be open source by including an open source license file. This license should be detectable and visible at the top of the repository page (in the About section)  
Repositories should have the following:
document.modelContext.registerTool({

       name: "search_products",

       description: "Search the product catalog",

        inputSchema: { /* ... */ },

        execute: async (input) => { /* ... */ }

});

Check the Resources tab for WebMCP starter docs and the FAQ for eligibility, submission, and setup basics.

PRIZES
$35,000 in prizes
WebMCP Challenge Winners

10 winners
OpenAI
• $3,000 USD in cash
• Spotlight on @OpenAIDevs on Twitter
• Codex Micro
• Swag (for up to 3 team members)
• Pro Account for 1 year for up to 3 team members

Cloudflare
• $10,000 in Cloudflare credits

Vercel
• $300 per month in Vercel credits and $50 per month in Gateway credits for twelve months ($3,600 + $600 per winner).

Render
• $300 in Render credits

Netlify
• $500 in cash prizes from Netlify

Shopify
• $250 in limited-edition Shopify Supply gear per winning submission.

Google Chrome
• 3-month subscription to Google AI Ultra per winning team member (~$300 value/team member)

DEVPOST ACHIEVEMENTS
Submitting to this hackathon could earn you:


X Hackathons
 level 4

Hackathon Winner
 level 1
JUDGES
Andrew Galloni
Andrew Galloni
VP Research & Innovation, Cloudflare

Alex Nahas
Alex Nahas
Creator of MCP-B

Ilya Grigorik
Ilya Grigorik
Distinguished Engineer, Shopify

Jude Gao
Jude Gao
Member of Technical Staff, Vercel · Next.js Core Team

Justin Rushing
Justin Rushing
Browser Platform Lead, OpenAI

Sarah Drasner
Sarah Drasner
Distinguished Engineer, Chrome, Google

Sean Roberts
Sean Roberts
VP of Applied AI, Netlify

JUDGING CRITERIA
WebMCP Leverage
How thoroughly and skillfully does the project use WebMCP? Does the code reflect genuine effort and a working, non-trivial implementation?
Execution
Does the project deliver a working or runnable project that has a complete, coherent product experience — not just a technical proof of concept?
Potential Impact
Does the project make a credible, specific case for solving a real problem for a real audience — and does the solution actually address that problem based on what's demonstrated?
Creativity & Ambition
How creative and novel is the concept and does the project differ from existing concepts?
Questions? Email the hackathon manager

Hackathon sponsors

OpenAI
Cloudflare
Vercel
Shopify
Google Chrome
Render
Netlify
This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.



Below is a strategic brief on what to build, grounded in the WebMCP spec, Chrome's developer docs, OpenAI's showcase, and the official rules — followed by seven concrete project ideas (plus one ambitious wildcard), each broken down into the actual `registerTool` calls you'd ship.

## What WebMCP actually changes (and how to win with it)

WebMCP adds `navigator.modelContext` (and `document.modelContext`) to the browser, letting a web page expose JavaScript functions as **structured tools** with JSON-Schema inputs, natural-language descriptions, and annotations like `readOnlyHint` and `untrustedContentHint`. A page that uses WebMCP effectively *becomes* an MCP server implemented in client-side script — sharing live, authenticated page state with an agent instead of forcing it to scrape the DOM. Tools execute visibly on the page, the human stays in the loop for sensitive actions, and the same signed-in session is shared between person and agent.【turn0fetch0】【turn0fetch1】

There are two surface areas to use: the **Imperative API** (`document.modelContext.registerTool({ name, description, inputSchema, execute, annotations })`), and the **Declarative API**, where you annotate ordinary HTML `<form>` elements so agents know how to fill them. Both are gated by the `tools` Permissions Policy (default `self`, cross-origin iframes need `allow="tools"`) and require origin-isolated documents.【turn0fetch1】【turn2fetch0】

The strategic implication for this hackathon is sharp: **ideas win when the task is stateful, multi-step, authenticated, and benefits from a confirmation gate** — i.e., where an agent *guessing through your UI* would reliably fail, but an agent *calling your tools* against live page state succeeds. That is the gap to target. Conversely, anything that's "an agent chats with a static dataset" under-uses the standard and will score low on **WebMCP Leverage**.【turn0fetch1】【turn1search0】

Two more anchor facts that should shape your pick:

- **Test surface**: ChatGPT's in-app browser supports WebMCP out of the box, and Chrome enables it via `chrome://flags/#enable-webmcp-testing` or the Chrome 149+ origin trial. The spec is explicitly designed for *local browser workflows with a human in the loop*, not headless automation — so your demo must show a person and an agent working the same live page.【turn0fetch1】【turn1search0】
- **Already taken territory** (avoid direct duplication): OpenAI's own showcase ships 3D Modeling, Collaborative Writing, Crossword Builder, Wandernote (travel itinerary), and a DuckDB-Wasm Data Explorer; Netlify's starter apps cover marketplace checkout (Kurio), a moderated guestbook (Tagboard), restaurant reservations (Mabel's Table), and a detective mystery (The Archive); Chrome's demos include zaMaker, a React travel demo, and Le Petit Bistro (declarative).【turn0fetch2】【turn0fetch3】【turn2fetch0】

## The shortlist at a glance

| # | Idea | Core WebMCP tools (illustrative) | Target user | Why WebMCP is essential |
|---|------|----------------------------------|-------------|--------------------------|
| A | Accessibility-first government/benefits form navigator | `explain_field`, `auto_fill_from_profile`, `validate_section`, `attach_document`, `submit_application` (HITL) | Benefits claimants, elderly, people with disabilities, caseworkers | Declarative form annotation + assistive-tech path the spec explicitly names; agents scraping conditional gov forms fail constantly【turn0fetch0】【turn0fetch1】 |
| B | Insurance claims concierge (file → supplement → negotiate) | `start_claim`, `upload_evidence`, `request_estimate`, `negotiate_line_item`, `submit_claim` (HITL), `add_supplement` | Policyholders; claims adjusters | Stateful negotiation loop over live claim line items with evidence attach — impossible via scraping【turn0fetch1】 |
| C | Subscription & bill negotiation workbench | `list_recurring_charges`, `draft_cancellation`, `send_cancellation_request`, `request_rate_reduction`, `schedule_pause`, `apply_credit` (HITL) | Consumers managing recurring spend | Acting on authenticated account state; drafting + sending structured requests with human approval per action |
| D | Local-services marketplace (quotes → compare → book) | `post_job`, `request_quotes`, `compare_quotes`, `ask_clarification`, `negotiate_price`, `hold_slot`, `book` (HITL) | Homeowners; service pros | Multi-pro coordination against live marketplace state — a classic WebMCP "structured action + confirmation" pattern【turn0fetch3】 |
| E | Dev/diagnostics & remediation console | `run_diagnostics`, `query_logs`, `inspect_request`, `toggle_feature_flag`, `replay_request`, `apply_remediation` (HITL) | SaaS developers, on-call engineers | Nested dev menus are exactly where scraping fails; the spec explicitly cites `run_diagnostics`【turn0fetch1】 |
| F | Healthcare scheduling + prior-auth navigator | `find_providers`, `check_coverage`, `start_prior_auth`, `attach_records`, `book_appointment` (HITL), `join_waitlist` | Patients, clinic staff | Provider search + insurance verification + scheduling is multi-form, stateful, authenticated; simulate data to avoid PHI |
| G | Multi-recipient e-commerce checkout optimizer (Shopify-flavored) | `search_products`, `compare_variants`, `apply_promo_stack`, `redeem_loyalty`, `split_shipment`, `add_recipient`, `estimate_tax`, `checkout` (HITL) | Shoppers buying for groups; small merchants | Discount-stacking + split-shipment + multi-recipient checkout is genuinely hard via scraping; Shopify is a sponsor【turn0fetch2】 |
| H | **Wildcard — Agent-native personal data locker & permissioned tool hub** | `grant_origin`, `revoke_origin`, `query_calendar`, `read_contact`, `issue_credential`, `audit_log` | Privacy-conscious power users | Demonstrates `exposedOrigins`, Permissions Policy, and origin isolation — the spec's security core — as a product【turn0fetch0】【turn0fetch1】 |

## Idea cards

### A. Accessibility-first government/benefits form navigator
**Concept.** A web app that turns convoluted benefits/immigration/housing/tax-relief applications into an agent-assisted, screen-reader-friendly experience. The agent explains each field in plain language, auto-fills from a stored profile, validates sections, attaches documents, and *only* submits after an explicit human confirmation. This is the single strongest "Impact" play on the list — and the WebMCP spec literally names *assistive technologies* as a first-class consumer of tools.【turn0fetch0】

**Tool breakdown (declarative-first).**
- Annotate the real `<form>` with the Declarative API so agents can fill conditional sections correctly (e.g., a field that wants "full name" vs. "first + last").【turn0fetch1】
- Imperative companions: `explain_field({ field_id })` returns a screen-reader-friendly description; `auto_fill_from_profile({ profile_id, section })`; `validate_section({ section_id })` returns errors/warnings; `attach_document({ field_id, file_ref })`; `request_human_review()`; `submit_application({ application_id })` gated by a confirmation dialog (HITL).

**Human + agent loop.** The user narrates intent ("apply for property tax senior exemption"); the agent walks the form section by section, fills what it can, flags ambiguous fields for the human, and surfaces a final review screen before `submit_application` fires. The human can edit any field and re-trigger validation.

**Differentiation & judges' angle.** No existing showcase/demo touches accessibility or assistive tech. Scores heavily on **Potential Impact** (real, large, underserved audience) and **WebMCP Leverage** (declarative + imperative + HITL). Sarah Drasner (Chrome, a11y advocate) is on the judging panel — a genuine, non-gimmicky accessibility story lands.【turn0fetch2】

**Watch out.** Use a *simulated* benefits form (or a clearly fictional jurisdiction) to avoid legal/PII issues; the rules exclude certain countries and require legal age of majority.【turn1search16】

---

### B. Insurance claims concierge
**Concept.** A claims portal where the policyholder and an agent file a claim, attach evidence, request an estimate, and — the novel part — *negotiate individual line items* when the adjuster's depreciation doesn't match reality. Each negotiation round drafts a structured challenge with a reason and supporting evidence, and the agent can re-submit after the human approves.

**Tool breakdown.**
- `start_claim({ policy_id, incident_type, incident_date, summary })` → returns `claim_id`.
- `upload_evidence({ claim_id, line_item_id, file_ref, caption })` (HITL confirm upload).
- `request_estimate({ claim_id, damaged_items[] })`.
- `negotiate_line_item({ claim_id, line_item_id, proposed_amount, reason, evidence_ids[] })` — the centerpiece; drafts a challenge against live claim state.
- `add_supplement({ claim_id, items[] })` for newly discovered damage.
- `submit_claim({ claim_id })` and `check_status({ claim_id })` (read-only, `readOnlyHint: true`).

**Human + agent loop.** The user uploads photos and says "the adjuster lowballed my roof by $2k." The agent calls `negotiate_line_item` with a drafted reason referencing comparable estimates, shows the proposed challenge, and on approval posts it. The page updates live.

**Differentiation & judges' angle.** A *negotiation loop over structured line items* is something no scraping agent could do reliably — it requires live claim state and a confirmation gate. Strong on **Creativity & Ambition** and **Execution** (it's a complete product loop, not a PoC).【turn0fetch1】

---

### C. Subscription & bill negotiation workbench
**Concept.** A personal finance dashboard where the agent audits recurring charges, categorizes spend, and *acts* — drafting and sending cancellation requests or rate-reduction negotiations on the live page, each gated by human approval. Think of it as a "do-it-for-me" layer over your linked subscription accounts.

**Tool breakdown.**
- `list_recurring_charges({ timeframe })` (read-only).
- `categorize_spend({ category_filter })`.
- `draft_cancellation({ merchant_id, account_ref, reason })` → returns a structured draft for review.
- `send_cancellation_request({ draft_id })` (HITL).
- `request_rate_reduction({ merchant_id, current_rate, proposed_rate, justification })` (HITL).
- `schedule_pause({ merchant_id, until })` and `apply_credit({ account_id, amount })` (HITL).

**Human + agent loop.** "Cancel anything I haven't used in 90 days, but negotiate my internet down first." The agent drafts each action, the user approves per-merchant, and the page reflects sent/pending/confirmed states.

**Differentiation & judges' angle.** Turns analytics into *actuation* — the exact thesis of the challenge ("becomes meaningfully better when people and their agents can use it together"). Real audience, real money saved. Scores on **Potential Impact** and **Execution**.【turn0fetch2】

**Watch out.** Since you can't truly actuate across arbitrary external merchant sites in 10 days, scope it as a single SaaS that manages *linked* accounts within your own app (simulate the merchant responses). That keeps it a coherent product, not a PoC.

---

### D. Local-services marketplace (quotes → compare → book)
**Concept.** A Thumbtack-style marketplace where the agent posts a structured job, requests quotes from multiple pros, compares them on the user's stated criteria (price, availability, ratings, distance), negotiates, holds a slot, and books — surfacing confirmations throughout.

**Tool breakdown.**
- `post_job({ category, requirements, location, schedule_window, budget_ceiling })` → `job_id`.
- `request_quotes({ job_id, pro_ids[] })`.
- `compare_quotes({ job_id, criteria[] })` (read-only) — returns a ranked table.
- `ask_clarification({ job_id, pro_id, question })`.
- `negotiate_price({ job_id, pro_id, offer_amount, justification })` (HITL).
- `hold_slot({ job_id, pro_id, slot })` and `book({ job_id, pro_id, slot })` (HITL, with confirmation dialog).

**Human + agent loop.** "Get me three electricians for Thursday under $250." The agent gathers quotes, ranks them, drafts a negotiation to the top pick, holds the slot on approval, and books.

**Differentiation & judges' angle.** Multi-party coordination against live marketplace state is a textbook WebMCP fit and isn't covered by Netlify's Mabel's Table (single-restaurant reservations). Strong on **Creativity** and aligns with the hackathon's E-commerce/Retail tag.【turn0fetch3】【turn0fetch2】

---

### E. Dev/diagnostics & remediation console
**Concept.** A developer settings/diagnostics page for a SaaS where the agent runs health checks, queries logs, inspects a request, toggles a feature flag, replays a failing request, and *applies a suggested remediation* — each destructive action confirmed by the on-call human. This is the use case Chrome's own docs call out by name (`run_diagnostics`).【turn0fetch1】

**Tool breakdown.**
- `run_diagnostics({ service_id })` (read-only-ish; returns a report).
- `query_logs({ service_id, filter, window })` (read-only).
- `inspect_request({ request_id })` (read-only).
- `toggle_feature_flag({ flag_id, state })` (HITL).
- `replay_request({ request_id, overrides })`.
- `apply_remediation({ incident_id, fix_id })` (HITL) — applies a suggested fix from a runbook.
- `open_ticket({ incident_id, summary })`.

**Human + agent loop.** "Why are 5xx errors spiking on the checkout service?" The agent runs diagnostics, pins a suspect request, proposes replaying with a flag toggle, the human approves, and the agent opens a ticket with the evidence attached.

**Differentiation & judges' angle.** The judges include Jude Gao (Vercel/Next.js), Andrew Galloni (Cloudflare), and Sean Roberts (Netlify) — a developer-tools story resonates with the panel and the sponsor credits (Vercel, Cloudflare, Render, Netlify). Scores on **WebMCP Leverage** (deep, non-trivial) and **Execution**.【turn0fetch2】

---

### F. Healthcare scheduling + prior-authorization navigator
**Concept.** A patient-facing portal where the agent finds in-network specialists matching constraints (specialty, language, location, availability), verifies coverage, *initiates a prior-authorization request* from a visit reason + diagnosis code, attaches records, and books — with confirmation. Tightly scoped to scheduling + coverage to stay clear of storing PHI.

**Tool breakdown.**
- `find_providers({ specialty, network, location, languages[], availability_window })` (read-only).
- `check_coverage({ provider_id, procedure_code })` (read-only).
- `start_prior_auth({ provider_id, procedure_code, diagnosis_code, visit_reason })` → `prior_auth_id`.
- `attach_records({ prior_auth_id, file_refs[] })` (HITL).
- `book_appointment({ provider_id, slot, reason })` (HITL, confirmation dialog).
- `reschedule({ appointment_id, new_slot })` and `join_waitlist({ provider_id, criteria })`.

**Human + agent loop.** "I need a cardiologist who takes my insurance, speaks Spanish, and has evening slots; get the prior-auth started." The agent returns ranked providers, drafts the prior-auth, and books on approval.

**Differentiation & judges' angle.** Highest raw impact on the list; provider search + insurance verification + scheduling is the canonical "multi-form, stateful, authenticated" trifecta. **Use entirely simulated data** (fictional providers/insurer) to avoid HIPAA/regulatory entanglement and to keep the live demo stable. The rules also exclude several countries and require age of majority — verify eligibility before investing.【turn1search16】【turn1search14】

---

### G. Multi-recipient e-commerce checkout optimizer
**Concept.** A storefront (Shopify-flavored) where the agent doesn't just add to cart but *optimizes* the checkout: compares variants across the catalog, stacks promo codes with loyalty redemption, splits a single order across multiple recipients/shipments, estimates tax, and completes a multi-recipient checkout with confirmation. Shopify is a named sponsor, so this aligns with both the prize pool and the E-commerce tag.【turn0fetch2】

**Tool breakdown.**
- `search_products({ query, filters })` and `compare_variants({ product_ids[] })` (read-only).
- `apply_promo_stack({ cart_id, codes[] })` — tries combinations and returns the optimal stack.
- `redeem_loyalty({ cart_id, points })`.
- `add_recipient({ cart_id, items[], address_ref })` and `split_shipment({ cart_id, grouping[] })`.
- `estimate_tax({ cart_id })` (read-only).
- `checkout({ cart_id })` (HITL, confirmation dialog).

**Human + agent loop.** "Buy gifts for Mom, Dad, and my sister; use whatever combo of codes and points is cheapest; ship to each." The agent proposes the optimal split + discount stack, the human approves, checkout runs.

**Differentiation & judges' angle.** Netlify's Kurio covers basic marketplace checkout, so the **differentiator must be the optimization layer** (discount stacking, split-shipment, multi-recipient) — make that the hero of the demo. Scores on **Execution** and **WebMCP Leverage**, and the Shopify sponsor credit (limited-edition gear) is a bonus.【turn0fetch3】

---

### H. Wildcard — Agent-native personal data locker & permissioned tool hub
**Concept.** The most ambitious, spec-leveraging entry: a personal site that acts as a *hub* the user owns. They selectively grant specific origins permission to call tools over their data (calendar, contacts, credentials vault), every call is audited, and sensitive tools require HITL. This productizes the spec's security primitives — `exposedOrigins`, the `tools` Permissions Policy, origin isolation, and the `untrustedContentHint` annotation — rather than treating them as boilerplate.【turn0fetch0】【turn0fetch1】【turn2fetch0】

**Tool breakdown.**
- `grant_origin({ origin, scopes[] })` and `revoke_origin({ origin })` (HITL).
- `query_calendar({ window, filter })` (read-only, `readOnlyHint: true`).
- `read_contact({ contact_id, fields[] })` (read-only).
- `issue_credential({ recipient_origin, claims[] })` (HITL) — issues a scoped, short-lived token a third-party site can use.
- `audit_log({ origin, since })` (read-only).

**Human + agent loop.** A user visits a new travel site; instead of OAuth-granting everything, they open their locker, grant the travel site a scoped `query_calendar` + `issue_credential` for 24h, and the agent on the travel site calls back — all visible, revocable, audited.

**Differentiation & judges' angle.** Maximizes **WebMCP Leverage** (you're demonstrating the *security model* as the product) and **Creativity & Ambition** — it directly advances the "agent-native open web" thesis OpenAI is pushing. Risk: scope. Mitigate by shipping a tight vertical (e.g., calendar + one credential type) done end-to-end.【turn0fetch2】

---

## How to pick, and the pitfalls that sink entries

**Match the idea to your strengths and the rubric.** The four criteria weighted equally are WebMCP Leverage, Execution, Potential Impact, and Creativity & Ambition.【turn1search15】 A few heuristics:

- If you want the **safest "complete product" path**: pick **D** or **G** — both are bounded, demoable end-to-end in 10 days, and align with sponsors.
- If you want the **highest Impact score**: pick **A** or **F** (accessibility / healthcare) — but F needs simulated data and careful scoping.
- If you want to **maximize Leverage + Ambition**: pick **H** or **B** — these show the spec's depth and originality.
- If you're a **developer-tools builder** (and want to resonate with the Vercel/Cloudflare/Netlify judges): pick **E**.

**Pitfalls that reliably drop entries out of the top 10:**

1. **PoC-only execution.** Judges explicitly want "a complete, coherent product experience — not just a technical proof of concept." Ship the full loop: landing → action → confirmation → result → history. A single `search_products` tool with no checkout flow is a demo, not a product.【turn1search15】
2. **Shallow WebMCP usage.** One read-only tool wrapped in chat will score low on Leverage. Aim for 5–10 tools spanning read, mutate, and HITL-confirmed sensitive actions; mix imperative and declarative where it makes sense; use annotations (`readOnlyHint`, `untrustedContentHint`) correctly.【turn2fetch0】
3. **No human-in-the-loop on sensitive actions.** The spec and Chrome docs are explicit that purchases, account changes, and irreversible actions need a confirmation gate. Omitting HITL on checkout/submit/booking is both a security smell and a scoring miss.【turn0fetch1】【turn1search0】
4. **Duplicating a showcase app.** Travel itineraries, 3D modeling, collaborative writing, crosswords, data exploration, marketplace checkout, restaurant reservations, guestbooks, and detective mysteries are all taken — differentiate hard or pick fresh territory.【turn0fetch2】【turn0fetch3】
5. **Scope creep.** 10 days. Pick one vertical, one core loop, and polish it. "Agent for everything" loses to "agent that does one valuable thing end-to-end."
6. **Forgetting submission mechanics.** You need: a **working live URL** (ChatGPT in-app browser or Chrome with the flag enabled), a **text description** addressing the four required questions, a **<3-minute demo video with audio**, and a **public repo** with an **OSS license visible in the About section** plus full run instructions. Test in ChatGPT's in-app browser *and* Chrome's flag before submitting — origin-isolation and Permissions-Policy gotchas bite.【turn0fetch1】【turn1search15】【turn1search14】

## A starter scaffold to copy

Imperative tool with annotations + HITL confirmation (the pattern most of the ideas above reduce to):

```js
// Origin-isolated document, Permissions-Policy "tools" allowed.
await document.modelContext.registerTool({
  name: 'negotiate_line_item',
  description: 'Challenge an adjuster\'s depreciation on a specific claim line item. Returns the drafted challenge for review.',
  inputSchema: {
    type: 'object',
    properties: {
      claim_id: { type: 'string' },
      line_item_id: { type: 'string' },
      proposed_amount: { type: 'number', minimum: 0 },
      reason: { type: 'string', maxLength: 1000 },
      evidence_ids: { type: 'array', items: { type: 'string' } },
    },
    required: ['claim_id', 'line_item_id', 'proposed_amount', 'reason'],
  },
  execute: async (input, { signal }) => {
    // 1. Draft the challenge against live claim state.
    const draft = await buildChallenge(input, { signal });
    // 2. Human-in-the-loop confirmation for a sensitive/irreversible action.
    const confirmed = await requestUserConfirmation({
      title: 'Submit line-item challenge?',
      body: renderDraft(draft),
      confirmLabel: 'Submit to adjuster',
    });
    if (!confirmed) return { status: 'aborted_by_user', draft_id: draft.id };
    // 3. Execute and return a structured, agent-readable result.
    const result = await submitChallenge(draft.id, { signal });
    return { status: 'submitted', challenge_id: result.id, expected_response_by: result.due };
  },
  annotations: { readOnlyHint: false, untrustedContentHint: true },
});
```

Declarative equivalent (annotate a real form so agents can fill conditional fields correctly — ideal for ideas A and F):【turn0fetch1】

```html
<form>
  <label for="full_name">Full legal name</label>
  <input id="full_name" name="full_name"
         tool="applicant_full_name"
         description="The applicant's full legal name as on their ID."
         required>
  <!-- Agent reads the tool annotation + description and fills the field
       via the declarative execute steps, instead of guessing from the DOM. -->
</form>
```

The `webmcp-types` npm package gives you TypeScript typings for the Imperative API, and Chrome's **Model Context Tool Inspector extension** lets you prompt an agent (default `gemini-3-flash-preview`) against your live page to verify tool discovery, schema parsing, and output formatting before you record your demo video.【turn2fetch0】【turn0fetch1】

## Submission checklist (8 days to deadline)

- [ ] Live URL reachable from ChatGPT's in-app browser *and* Chrome with `chrome://flags/#enable-webmcp-testing` enabled.【turn0fetch1】
- [ ] Origin-isolated (no `document.domain` / `Origin-Agent-Cluster: ?0`); `tools` Permissions-Policy set correctly for any cross-origin iframes (`allow="tools"`).【turn0fetch1】
- [ ] 5–10 tools spanning read / mutate / HITL-confirmed; annotations used where appropriate.
- [ ] A complete product loop (not a PoC), with a coherent UI a judge can drive solo.
- [ ] Text description answering: why WebMCP is a strong fit, how it improves UX, what people+agents can now do together that was hard before, and how you implemented it.【turn1search15】
- [ ] <3-minute YouTube demo with audio, showing the human+agent collaboration live.
- [ ] Public repo, OSS license file visible in the GitHub "About" section, plus setup + run instructions.【turn1search15】

If you want, tell me which of A–H you're leaning toward and I'll map out the full tool schema set, the page-state model, and a 10-day build plan against the rubric.

Yes, the AI form-filling field is crowded — but the specific slice you'd be building in is genuinely empty, and that distinction is the whole game. Here's the grounded answer.

## Verdict: Idea A is viable — but only if you reframe it

The generic "AI autofills your form" space is saturated with well-funded tools. But **no existing service makes the form *itself* expose structured semantics that an agent and a screen reader can both consume on the live, authenticated page.** That is the WebMCP-native accessibility wedge, and it's defensible. If you build "another form filler that guesses the DOM," you lose. If you build "the first form that is its own MCP server for agents and assistive tech," you win the rubric on Leverage, Impact, and Creativity simultaneously.

## What already exists — the competitor map

The field splits into four buckets, none of which occupy your slice:

| Tool | Approach | What it does | Where it fails for your audience |
|---|---|---|---|
| **Magical** | Chrome extension, web-form autofill from spreadsheet/CRM data | Repetitive web data entry (job apps, checkouts, CRM) — DOM-context matching, text shortcuts【turn3fetch0】 | Browser-only, no PDFs; breaks on conditional gov forms; no validation, no doc attach, no HITL submit【turn3fetch0】 |
| **Filliny / FillApp / Fill Hero** | Context-aware Chrome extension | Reads form context, maps saved profile to fields including free-text【turn3fetch0】【turn1search3】 | Same DOM-guessing model; "free-text answers still deserve a read before submit"; no submission flow【turn3fetch0】 |
| **Instafill.ai** | PDF form filler (web + Chrome ext) | Fills 100-page PDFs in 25–60s; handles checkboxes/tables/radio buttons; tax, immigration, HUD/housing【turn1search0】【turn3fetch0】 | Static PDF only; can't interact with live web forms or conditional logic; "double-check output on high-stakes docs"【turn3fetch0】 |
| **Adobe Acrobat Fill & Sign + AI Assistant** | PDF native | Fills/signs PDFs; AI summarizes the document【turn3fetch0】 | "Doesn't intelligently map saved data to every field"; reading-focused, not auto-complete【turn3fetch0】 |
| **FormBuddy.ai** | Standalone service, 50k+ templates, voice-to-form in 11+ languages, "agent mode" for attorneys/social workers, 95% accuracy claim, on-device processing【turn1search35】 | Closest competitor: government forms, voice input, professional mode | You **upload/copy your form to their service** — it doesn't expose the live form's semantics; no shared authenticated page state; no HITL on the actual submit |
| **RoboForm** | Password-manager vault | Fills logins/identities/payments from encrypted vault【turn3fetch0】 | Vault-driven autofiller, "not an AI that reasons about unfamiliar free-text fields or fills PDFs"【turn3fetch0】 |
| **Bardeen / Skyvern** | Browser automation, computer vision | Multi-step workflows, scrape-then-fill-then-act【turn3fetch0】【turn0search2】 | Overkill for one form; vision-based, brittle to layout changes; not accessibility-focused |
| **Code for America — GetYourRefund** | Human-assisted (IRS-certified VITA volunteers) | Free tax filing for low-income households; $1.4B claimed since 2020【turn0search12】【turn0search13】 | Tax-only; human-in-the-loop volunteers, not agent-autonomous; not designed for disability/accessibility |
| **Nava Labs + Amplifi — Benefit Navigator** | AI for **caseworkers**, not applicants | Helps navigators identify which families can enroll in WIC/SNAP/Medicaid; tracks client benefits status; 17k households, $185M accessed【turn5search0】【turn5search4】 | Caseworker-facing, not applicant-facing; eligibility screening, not form completion |
| **AI Navigator (Medicaid/SNAP, Dec 2025)** | Member-facing resource finder | Locates transportation, food, housing support【turn1search9】【turn5search1】 | Resource directory, not form-filling |
| **VA Canada Claim Summary Tool** | Agency-side AI | Organizes docs, highlights key details for decision-makers; "does not make decisions"【turn1search30】 | Agency-side review, not applicant-facing |
| **Raw ChatGPT on a form** | Freeform LLM | User pastes form text, ChatGPT drafts answers | **UK DWP explicitly warns this jeopardizes eligibility** on PIP forms — accuracy/integrity risk【turn1search38】 |

## The gap nobody fills

Every tool above does one of three things: (1) guesses your DOM from the outside, (2) fills a static PDF you uploaded, or (3) puts a human or a caseworker in the loop. **None of them let the form itself declare its semantics as structured tools that an agent and a screen reader consume on the live, authenticated page.**

This gap is not hypothetical — it's the exact design center of the WebMCP spec. The spec's introduction states that tools can be invoked by "agents, browser's agents, and **assistive technologies**" and that "web pages that use WebMCP can be thought of as MCP servers that implement tools in client-side script."【turn1search12】 The spec editors opened a dedicated accessibility meta-issue (#65) in January 2026, where Léonie Watson — a leading screen-reader expert — noted that "screen readers could benefit from WebMCP in the same way that agents are intended to," and that both screen readers and agents are "vulnerable when sufficient information is unavailable" because both depend on the DOM/accessibility tree.【turn3fetch1】 A contributor building MCP servers on macOS accessibility APIs put the synergy plainly: "better accessibility = better AI automation."【turn3fetch1】

The W3C's cognitive-disability guidelines (COGA) reinforce the requirement your competitors ignore: people with cognitive/learning disabilities need to "check their work and fix mistakes easily" and "the process of reversing a transaction is too complex for them to manage without help."【turn5search7】 None of the autofillers provide section-by-section validation + HITL on submission; they just fill and leave you to submit.

And the real-world stakes are documented: nearly half of US federal websites fail at least one accessibility test【turn5search17】, and administrative burdens in benefits programs disproportionately harm disabled people and older adults.【turn5search15】【turn5search16】

## Why users would use this instead of each alternative

**Instead of raw ChatGPT:** The DWP warning is the proof. Freeform LLM generation on a benefits form is unreliable and can jeopardize eligibility for hundreds of dollars a month.【turn1search38】 WebMCP's structured tools give the agent a contract — it calls `fill_field({ field_id, value })` against the live form, not a hallucinated draft. Determinism beats guessing on high-stakes forms.

**Instead of Magical/Filliny/FillApp:** Those work on simple repetitive web forms (job apps, checkouts) by scraping DOM context. They break on conditional government forms with branching logic ("if you've lived at your current address less than 12 months, list previous addresses"), they don't validate sections, they can't attach supporting documents, and they hand off submission to you with no confirmation gate. Your tool fills the *live* form deterministically, validates each section, attaches docs, and submits only after human approval — all against the form's own declared semantics.

**Instead of FormBuddy:** FormBuddy is the closest competitor, but you upload your form *to their service*. They process it server-side against 50k templates. Your tool keeps the user on the live, authenticated form — the form *is* the MCP server. No data leaves the page unless the user explicitly submits. For benefits claimants handling sensitive PII (SSN, income, medical info), that's a real trust advantage, and it's the architectural difference WebMCP was designed for.

**Instead of Instafill/Acrobat (PDF):** Those fill static PDFs. Most modern benefits applications are live web forms with conditional logic, not PDFs. They can't interact with the form's branching state.

**Instead of GetYourRefund / Nava / Amplifi:** Those are either tax-specific, human-volunteer-staffed, or caseworker-facing. There is no applicant-facing, agent-autonomous benefits form navigator. That's your lane.

## The reframed positioning

Don't pitch this as "AI form filling." Pitch it as: **a benefits form that exposes its own semantics as WebMCP tools, so an agent and a screen reader can fill it deterministically, validate each section, attach evidence, and submit only after human confirmation.**

The one-sentence differentiator that should anchor your demo video and submission text: *every existing form filler reads your form from the outside and guesses — this form declares its own structure as tools, so the agent fills it deterministically and a screen reader can consume the same contract.*

## The concrete tool set (reframed for the accessibility wedge)

- **Declarative annotations** on the real `<form>` elements — so the agent fills conditional sections correctly (field wants "full name" vs "first + last"; conditional address-history section). This is the spec's Declarative API, and no competitor uses it.【turn1search13】
- `explain_field({ field_id })` → returns a plain-language, screen-reader-friendly description of what the field wants and why. Directly addresses the COGA requirement that users understand what they're being asked.【turn5search7】
- `auto_fill_from_profile({ section_id })` → deterministically fills from a stored profile, against the live form's declared semantics.
- `validate_section({ section_id })` → returns structured errors/warnings before submission. Closes the "check their work and fix mistakes easily" gap.【turn5search7】
- `get_form_state()` (read-only, `readOnlyHint: true`) → returns a structured accessibility snapshot of current form state — the exact artifact m13v identified as missing: "something in between a DOM dump and a screenshot."【turn3fetch1】 This tool is consumable by both agents and screen readers.
- `attach_document({ field_id, file_ref })` (HITL) → attaches supporting evidence (income proof, ID, medical records).
- `request_human_review({ section_id })` → surfaces the section for the user to review before proceeding.
- `submit_application({ application_id })` (HITL, confirmation dialog) → the irreversible action, gated.

The `get_form_state` tool is the one that makes judges sit up — it's the structured accessibility snapshot the spec contributors are actively asking for, and no showcase app provides it.

## Honest viability verdict against the rubric

| Criterion | Score | Reasoning |
|---|---|---|
| **WebMCP Leverage** | **High** | Declarative API on the real form + imperative tools spanning read (`get_form_state`, `validate_section`), mutate (`auto_fill_from_profile`, `attach_document`), and HITL-confirmed (`submit_application`). Uses `readOnlyHint` and `untrustedContentHint` annotations correctly. The `get_form_state` accessibility-snapshot tool is a non-trivial, spec-aligned contribution. No competitor uses the declarative API at all. |
| **Execution** | **Medium-high** | The risk is scope. You need: a fictional but realistic benefits form with conditional logic, the agent tool layer, a coherent UI that a judge can drive solo, and a working human+agent demo. Use a *simulated* fictional-jurisdiction form to avoid PII/legal issues. Ship the full loop: intake → fill → validate → attach → review → submit → confirmation. A single `fill_field` tool with no validation/submit is a PoC and will score low. |
| **Potential Impact** | **High** | Real audience (1 in 4 US adults has a disability【turn5search11】; nearly half of federal sites fail accessibility【turn5search17】; administrative burdens harm disabled and elderly【turn5search15】【turn5search16】). Specific problem (benefits form completion for people who can't navigate the visual UI). The DWP warning proves the existing-tools-are-dangerous case.【turn1search38】 |
| **Creativity & Ambition** | **Medium-high** | The "form as its own MCP server" framing is novel and not in any showcase app. The accessibility-snapshot tool (`get_form_state`) directly advances an open spec discussion. The risk is that "form filling" sounds unsexy — the demo must sell the accessibility + determinism angle, not the autofill angle. |

**Net assessment: A has a real chance — likely a top-10 contender if executed as a complete product loop with the accessibility framing as the hero.** The competitive pressure is real but it's all in the *generic autofill* space, which you're explicitly not building. Your differentiation is architectural (the form declares its own semantics) and audience-specific (accessibility + benefits), not feature-by-feature.

## If you want to hedge

D (local-services marketplace) remains the strong fallback — it has lower competitive pressure (Angi/Thumbtack are lead-gen, not agent-coordinated), a cleaner 10-day build, and sponsor alignment. But A scores higher on Impact and Leverage if you can execute the product loop. If your team has front-end chops to build a convincing conditional benefits form UI, take A. If you'd rather build against a simpler marketplace state model, take D.

If you commit to A, the next step is mapping the full tool schema set, the page-state model, and the fictional-jurisdiction form structure — and I'd anchor the entire submission narrative on the accessibility-snapshot tool and the DWP warning, because those two facts are what make "another form filler" into "the form that exposes itself."


Before the breakdown, a few clarifying questions that will materially shape the build. I've made sensible default assumptions below, but flagging them so you can correct course before any code is written:

1. **Tech stack & deployment target** — Netlify, Vercel, ChatGPT Sites, Cloudflare? (Affects whether you use a framework like Next.js/Astro vs. a static site, and which sponsor credits you can lean on.)
2. **Team size & front-end capacity** — Solo or team? Can you build a convincing multi-section conditional benefits form UI with validation states in ~8 days, or do you need a leaner form?
3. **Demo persona** — A single fictional benefits program (e.g., a fictional state's "Accessibility Living Allowance"), or a realistic composite of SNAP/Medicaid-style conditional fields? The former is cleaner for judging; the latter hits harder on Impact but risks looking like a real government form.
4. **Auth model** — Allow optional auth (so judges can log in as a seeded "claimant" with a stored profile), or keep it fully open with profile stored in localStorage? Auth strengthens the "shared authenticated session" narrative but adds build time.
5. **Accessibility testing in demo** — Do you want to actually show a screen reader (VoiceOver/NVDA) consuming the `get_form_state` tool output in the demo video, or demonstrate via the Chrome Model Context Tool Inspector extension? The former is far more compelling on Impact but requires screen-reader fluency.

I'll proceed with the breakdown assuming: **Vercel/Netlify static deploy, a fictional single benefits program, optional seeded auth, and the Chrome Model Context Tool Inspector as the primary test surface with VoiceOver as a stretch demo goal.** Let me do a final verification pass on the spec details I'll be coding against.
Confirmed the two spec details that shape the build: the **Declarative API** uses `toolname` / `tooldescription` / `toolparamdescription` / `toolautosubmit` attributes, with `SubmitEvent.agentInvoked` and `respondWith(Promise)` for returning results to the agent【turn1fetch0】; and the security model gives you `readOnlyHint`, `untrustedContentHint`, `exposedTo`, character budgets (500/150/30/1.5K), and a `requestUserInteraction()` primitive for human-in-the-loop confirmations.【turn1fetch1】 That's the toolkit. Here's the full breakdown.

---

# Project A — "Formwise": an accessibility-first benefits form that exposes itself as a WebMCP tool server

## 1. Project overview (the one-paragraph pitch)

Formwise is a web app representing a fictional jurisdiction's disability benefits application (the "Accessibility Living Allowance"). The form itself is the product: it uses WebMCP's Declarative API to annotate its real HTML fields, and the Imperative API to register companion tools — `explain_field`, `get_form_state`, `validate_section`, `auto_fill_from_profile`, `attach_document`, `request_human_review`, and `submit_application`. A person and an agent work the same live, authenticated page: the agent calls tools deterministically against the form's declared semantics, each section is validated before proceeding, evidence is attached, and submission is gated behind a human confirmation. The hero differentiator is `get_form_state`, a structured accessibility snapshot consumable by both agents and screen readers — the artifact the WebMCP accessibility working group explicitly identified as missing.【turn1fetch1】

**Working name:** Formwise (or pick your own). **Deployment:** Vercel or Netlify static + edge function. **Fictional jurisdiction:** "the Province of Meridia" — clearly fictional, avoids PII/legal entanglement, lets you design realistic conditional logic without impersonating a real agency.

## 2. Problem & target user

| Dimension | Detail |
|---|---|
| **Primary users** | (1) People with motor disabilities who cannot navigate a multi-section visual form; (2) blind/low-vision screen-reader users for whom conditional, branching forms are reliably inaccessible; (3) elderly claimants facing administrative burden; (4) cognitive/learning-disabled users who need plain-language field explanations and reversible, validated steps.【turn5search7】【turn5search15】【turn5search16】 |
| **Secondary users** | Benefits navigators / caseworkers (the Nava/Amplifi audience【turn5search0】【turn5search4】) who today help clients fill forms manually and could delegate the mechanical work to an agent while keeping human judgment on eligibility. |
| **The specific pain** | Nearly half of US federal websites fail at least one accessibility test【turn5search17】; the UK DWP explicitly warns that raw ChatGPT-on-benefits-forms jeopardizes eligibility【turn1search38】; existing form-fillers (Magical, Filliny, FormBuddy, Instafill) all read the form *from the outside* and guess — none let the form declare its own semantics as a contract an agent and a screen reader both consume. |
| **Why now / why WebMCP** | The spec's introduction names *assistive technologies* as a first-class tool consumer【turn0search12】, and the spec editors opened accessibility meta-issue #65 in Jan 2026 where Léonie Watson noted "screen readers could benefit from WebMCP in the same way that agents are intended to" and a contributor flagged the missing "structured accessibility snapshot" tool format.【turn3fetch1】 |

## 3. The fictional benefits form (the product surface)

A single multi-section application for the fictional "Accessibility Living Allowance" (ALA), with realistic conditional logic:

- **§1 Applicant identity** — full name, date of birth, contact, preferred contact method.
- **§2 Residence history** — current address; *conditional*: if current address < 12 months, previous addresses section appears.
- **§3 Disability & daily life** — condition category (select), onset date, functional impact across 6 domains (radio groups); *conditional*: if mobility domain selected, a mobility-aids sub-section appears.
- **§4 Income & household** — household size, income bands, existing benefits received (checkboxes).
- **§5 Evidence upload** — attach medical evidence, ID, proof of residence (file inputs).
- **§6 Review & declaration** — summary, consent checkboxes, declaration, submit.

Each section has its own validation rules and conditional logic — exactly where DOM-scraping agents fail.

## 4. Core WebMCP tool set

| Tool name | Type | Purpose | Input schema (key fields) | Output | Annotations |
|---|---|---|---|---|---|
| `ala_application_form` | Declarative | The form itself is a tool; agent fills fields by calling the toolname with field parameters | Form fields become JSON Schema properties via `toolparamdescription`【turn1fetch0】 | `SubmitEvent.respondWith()` returns confirmation | `toolautosubmit` off → user clicks Submit |
| `explain_field` | Imperative, read-only | Returns a plain-language, screen-reader-friendly explanation of what a field wants and why | `{ field_id: string }` | `{ description: string, why_asked: string, examples: string[] }` | `readOnlyHint: true` |
| `get_form_state` | Imperative, read-only | **The hero tool.** Returns a structured accessibility snapshot of current form state — sections, field values, conditional visibility, validation status — consumable by both agents and screen readers【turn3fetch1】 | `{ include_hidden: boolean }` | `{ sections: [{ id, title, visible, fields: [{ id, role, label, value, valid, error }] }], completion: number }` | `readOnlyHint: true`, `untrustedContentHint: true` (returns user-entered values) |
| `validate_section` | Imperative, read-only | Validates a section against its rules, returns structured errors before proceeding | `{ section_id: string }` | `{ valid: boolean, errors: [{ field_id, message, severity }], warnings: [...] }` | `readOnlyHint: true` |
| `auto_fill_from_profile` | Imperative, mutating | Deterministically fills fields from a stored claimant profile against the form's declared semantics | `{ section_id: string, profile_id: string }` | `{ filled: [field_id], skipped: [{ field_id, reason }] }` | (mutating; no readOnlyHint) |
| `attach_document` | Imperative, mutating, HITL | Attaches an uploaded evidence file to a field; requires human confirmation | `{ field_id: string, file_name: string, mime_type: string }` | `{ attached: boolean, document_id: string }` | Calls `requestUserInteraction()`【turn1fetch1】 |
| `request_human_review` | Imperative, mutating | Surfaces a section for the user to review before the agent proceeds | `{ section_id: string }` | `{ reviewed: boolean }` | HITL |
| `submit_application` | Imperative, mutating, HITL | The irreversible action. Gated behind a confirmation dialog summarizing the full application | `{ application_id: string }` | `{ status: 'submitted', reference_number: string, confirmation_url: string }` | HITL, `untrustedContentHint: false` |

That's 8 tools spanning declarative + imperative, read/mutate/HITL, with both annotations used correctly — non-trivial on every axis of the **WebMCP Leverage** criterion.【turn1fetch1】

## 5. Architecture & tech stack

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (ChatGPT in-app browser OR Chrome + flag)          │
│                                                             │
│  ┌───────────────────┐    ┌──────────────────────────────┐ │
│  │  Formwise SPA     │    │  WebMCP tool layer           │ │
│  │  (React/Astro +   │    │  (document.modelContext       │ │
│  │   Tailwind, fully  │    │   .registerTool for 7        │ │
│  │   accessible UI)   │    │   imperative tools + 1       │ │
│  │                   │    │   declarative form)          │ │
│  │  - ALA form (6 §)  │◄──►│  - get_form_state snapshot   │ │
│  │  - Profile store  │    │  - HITL via requestUser-     │ │
│  │  - Validation     │    │    Interaction()             │ │
│  │  - File attach    │    │  - AbortSignal handling      │ │
│  └───────────────────┘    └──────────────┬───────────────┘ │
│                                          │                  │
│  ┌───────────────────────────────────────┘                 │
│  │ Agent (ChatGPT in-app browser agent, OR                │
│  │  Chrome Model Context Tool Inspector extension for      │
│  │  testing — default gemini-3-flash-preview)              │
│  └─────────────────────────────────────────────────────────│
└─────────────────────────────────────────────────────────────┘
              │ fetch (optional, for seeded profiles)
              ▼
┌─────────────────────────────────────────────────────────────┐
│  Edge function (Vercel/Netlify) — serves seeded claimant   │
│  profiles; returns mock submission reference numbers.      │
│  No real PII stored. localStorage fallback if no auth.     │
└─────────────────────────────────────────────────────────────┘
```

**Stack choices & rationale:**
- **React + Vite + Tailwind** (or Astro for a leaner static build). React's component model maps cleanly to conditional sections; Tailwind keeps the a11y-first CSS fast.
- **No backend database.** Profiles are either seeded JSON served by an edge function, or stored in `localStorage`. Submission "succeeds" with a mock reference number. This keeps the build to 8 days and avoids any PII/HIPAA-adjacent risk.
- **Optional seeded auth** — a simple `/login` that sets a cookie identifying the judge as "claimant #1" with a pre-populated profile. Strengthens the "shared authenticated session" narrative WebMCP is built for, without real auth complexity.
- **Origin isolation + Permissions Policy** — the spec requires origin-isolated documents and the `tools` permission policy (default `self`).【turn0fetch1】 Verify `Origin-Agent-Cluster` is not set to `?0`, and add `allow="tools"` only if you use iframes (you shouldn't need to).
- **`webmcp-types` npm package** for TypeScript typings on the Imperative API — saves time and catches schema errors.【turn0search15】

## 6. Module breakdown

### Module 1 — Frontend (the form & accessible UI)
- 6-section conditional form with a section navigator, progress indicator, and a "review" summary screen.
- Every field has a proper `<label>`, `aria-describedby` pointing to the explanation, and `toolparamdescription` for the declarative API.【turn1fetch0】
- Conditional sections render/hide via React state, mirrored in `get_form_state`'s `visible` flag.
- Validation messages render in an ARIA live region so screen readers announce errors as they appear.
- A "profile" panel showing stored data the agent can draw from (name, DOB, address, household composition, prior evidence files).
- A "tool activity" panel showing each WebMCP tool call as it happens (name, input, output, duration) — makes the agent's work visible to judges and demonstrates non-trivial tool usage.

### Module 2 — WebMCP tool layer
- A single `tools.ts` module that registers all 7 imperative tools on app load (guarded by `navigator.modelContext` existence + origin-isolation check).
- The declarative form lives in the form component itself via `toolname` / `tooldescription` / `toolparamdescription` attributes.【turn1fetch0】
- `get_form_state` builds the accessibility snapshot by walking the form's React state tree and emitting `{ role, label, value, valid, error }` per field — the structured snapshot m13v identified as the missing middle ground between "DOM dump (too large)" and "screenshot (loses structure)."【turn3fetch1】
- HITL tools (`attach_document`, `submit_application`) call `requestUserInteraction()` to surface a confirmation dialog, then resolve the tool promise with the result.【turn1fetch1】
- All tool outputs respect character budgets: ≤500 char descriptions, ≤150 char param descriptions, ≤1.5K output.【turn1fetch1】
- `AbortSignal` wired through `execute` for cancellation, passed to any `fetch` calls.【turn0search15】

### Module 3 — Agent flow (the human + agent loop)
The canonical demo flow, end to end:
1. **Intake** — user opens the app, optionally signs in as a seeded claimant. The agent discovers tools via `getTools()`.
2. **Orient** — agent calls `get_form_state({ include_hidden: false })` to see what sections exist and what's already filled.
3. **Explain** — user asks "what does §3 want?"; agent calls `explain_field` on each field, reads descriptions aloud (or displays them) — closing the COGA requirement that users understand what they're asked.【turn5search7】
4. **Fill** — agent calls `auto_fill_from_profile({ section_id: '§1', profile_id })`; form fills deterministically; tool returns which fields were filled and which were skipped with reasons.
5. **Validate** — agent calls `validate_section({ section_id: '§2' })`; if conditional address-history is needed and missing, error surfaces; agent asks the user for previous addresses, calls `auto_fill_from_profile` again.
6. **Attach evidence** — agent calls `attach_document({ field_id: 'medical_evidence', file_name: 'gp_letter.pdf' })`; `requestUserInteraction()` fires; user confirms in dialog; file attached.
7. **Review** — agent calls `request_human_review({ section_id: '§6' })`; summary screen shown; user reads through, edits any field directly.
8. **Submit** — agent calls `submit_application({ application_id })`; confirmation dialog shows full application summary; user approves; mock reference number returned; confirmation screen.

### Module 4 — Demo scenario (the 3-minute video script)
The submission requires a **<3-minute public YouTube video with audio** showing a clear demo covering what you built and how you used WebMCP.【turn0search7】 Tight script:

| Time | Beat |
|---|---|
| 0:00–0:20 | Hook: "Existing form-fillers read your form from the outside and guess. Formwise's form declares its own structure as WebMCP tools — so the agent fills it deterministically, and a screen reader can consume the same contract." |
| 0:20–0:40 | Open the app in ChatGPT's in-app browser. Show the empty ALA form. |
| 0:40–1:20 | Narrate intent: "I'm applying for the Accessibility Living Allowance; I have limited mobility and use a screen reader." Agent calls `get_form_state`, then `explain_field` on §3. |
| 1:20–2:00 | Agent calls `auto_fill_from_profile` for §1 and §2; show the form filling deterministically; conditional address-history appears; agent calls `validate_section`, catches a missing field, asks the user. |
| 2:00–2:30 | Agent calls `attach_document` — HITL dialog appears; user confirms. Then `request_human_review` → summary screen. |
| 2:30–2:55 | `submit_application` — confirmation dialog with full summary; user approves; reference number returned. Show the tool-activity panel to prove genuine WebMCP usage. |
| 2:55–3:00 | One line on the accessibility-snapshot tool and the open spec contribution. |

### Module 5 — Submission checklist
The rules require:【turn0search7】
- [ ] **Working live URL** — reachable in ChatGPT's in-app browser AND Chrome with `chrome://flags/#enable-webmcp-testing` enabled.【turn0search1】
- [ ] **Text description** answering: (1) why WebMCP is a strong fit, (2) how it improves UX, (3) what people + agents can now do that was hard before, (4) how you implemented WebMCP.
- [ ] **<3-minute YouTube demo video with audio.**
- [ ] **Public repo** with an OSS license file visible in the GitHub "About" section, full source, assets, and run instructions.【turn0search7】
- [ ] **Origin-isolated** document; `tools` Permissions-Policy not broken by `Origin-Agent-Cluster: ?0`.【turn0fetch1】
- [ ] **Eligibility verified** — legal age of majority; not a resident of an excluded country/region.【turn1search16】

## 7. Tool naming & schema sketch (copy-paste ready)

Declarative form (the form itself is a tool):
```html
<form toolname="ala_application_form"
      tooldescription="Apply for the Accessibility Living Allowance (ALA), a Meridian disability benefit. Fills applicant, residence, disability, income, and evidence sections.">
  <label for="fullName">Full legal name</label>
  <input id="fullName" name="fullName" type="text" required
         toolparamdescription="Applicant's full legal name as on their ID.">

  <label for="contactPref">Preferred contact method</label>
  <select id="contactPref" name="contactPref" required
          toolparamdescription="How the agency should contact the applicant.">
    <option value="email">Email</option>
    <option value="phone">Phone</option>
    <option value="post">Postal mail</option>
  </select>
  <!-- ...remaining sections... -->
  <button type="submit">Submit application</button>
</form>
<script>
  form.addEventListener('submit', (e) => {
    if (e.agentInvoked) {
      e.preventDefault();
      e.respondWith(processApplication(e.target));
    }
  });
</script>
```
The `agentInvoked` boolean lets your app branch on agent-driven vs human-driven submission.【turn1fetch0】

Imperative hero tool:
```js
await document.modelContext.registerTool({
  name: 'get_form_state',
  description: 'Returns a structured accessibility snapshot of the current ALA application form: sections, field roles, labels, current values, visibility, and validation status. Consumable by both AI agents and screen readers.',
  inputSchema: {
    type: 'object',
    properties: {
      include_hidden: { type: 'boolean', description: 'Include conditionally-hidden sections in the snapshot.' }
    }
  },
  execute: async ({ include_hidden }, { signal }) => {
    const snapshot = buildAccessibilitySnapshot({ includeHidden: include_hidden, signal });
    return JSON.stringify(snapshot); // respects 1.5K budget — paginate if needed
  },
  annotations: { readOnlyHint: true, untrustedContentHint: true }
});
```

HITL submission tool:
```js
await document.modelContext.registerTool({
  name: 'submit_application',
  description: 'Submit the completed ALA application to the Meridian benefits agency. Irreversible. Requires human confirmation via a review dialog.',
  inputSchema: {
    type: 'object',
    properties: { application_id: { type: 'string' } },
    required: ['application_id']
  },
  execute: async ({ application_id }, { signal }) => {
    const summary = await buildSubmissionSummary(application_id, { signal });
    const approved = await requestUserInteraction({
      title: 'Submit your ALA application?',
      body: renderSummary(summary),
      confirmLabel: 'Submit',
      cancelLabel: 'Go back'
    });
    if (!approved) return JSON.stringify({ status: 'cancelled_by_user' });
    const ref = await mockSubmit(application_id, { signal });
    return JSON.stringify({ status: 'submitted', reference_number: ref });
  },
  annotations: { readOnlyHint: false }
});
```

## 8. Differentiation & judging-criteria mapping

| Criterion | How Formwise scores | Evidence |
|---|---|---|
| **WebMCP Leverage** | Declarative API on the real form + 7 imperative tools spanning read/mutate/HITL, both annotations used correctly, `AbortSignal` handling, `exposedTo` if needed, character budgets respected, `agentInvoked` branching. The `get_form_state` accessibility snapshot is a non-trivial, spec-aligned contribution no showcase app provides. | 【turn1fetch0】【turn1fetch1】【turn3fetch1】 |
| **Execution** | Complete product loop: intake → explain → fill → validate → attach → review → submit → confirmation. A judge can drive it solo. The fictional-jurisdiction form keeps it coherent without impersonating a real agency. | — |
| **Potential Impact** | 1-in-4 US adults has a disability【turn5search11】; nearly half of federal sites fail a11y【turn5search17】; DWP warns raw ChatGPT jeopardizes benefits eligibility【turn1search38】; administrative burdens harm disabled and elderly【turn5search15】【turn5search16】. Specific audience, specific problem, demonstrated solution. | — |
| **Creativity & Ambition** | "Form as its own MCP server" is architecturally novel and not in any showcase app. The accessibility-snapshot tool directly advances an open spec discussion (issue #65). Differentiates from Magical/Filliny/FormBuddy/Instafill on architecture, not features. | 【turn3fetch1】 |

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| **Looks like "another form filler"** | The demo video and submission text must lead with the architectural differentiator (form declares its own semantics) and the accessibility-snapshot tool, not "AI autofill." Anchor on the DWP warning as proof existing approaches are dangerous. |
| **`get_form_state` exceeds 1.5K output budget** | Paginate by section: `get_form_state({ section_id })` returns one section at a time. Character budget is 1.5K per tool output.【turn1fetch1】 |
| **Conditional logic breaks the declarative form** | Use the declarative API for the stable fields, and the imperative `get_form_state` / `validate_section` to expose conditional state. The two APIs compose — that's a feature, not a bug. |
| **Judge can't test (no ChatGPT in-app browser / flag off)** | Provide clear "how to test" instructions in the repo README: enable `chrome://flags/#enable-webmcp-testing` in Chrome, OR open in ChatGPT's in-app browser. Provide a seeded "judge" login so they skip onboarding. |
| **Screen-reader demo too ambitious** | Default to the Chrome Model Context Tool Inspector extension for the demo (it lets you prompt an agent against the live page and watch tool calls).【turn0search15】 Add a VoiceOver stretch goal only if time permits. |
| **Eligibility / excluded countries** | Verify you're above age of majority and not in an excluded region before building.【turn1search16】 |
| **Scope creep into real benefits integration** | Hard rule: fictional jurisdiction only. No real API calls. Mock submission returns a reference number. This keeps the 8-day build realistic and avoids regulatory entanglement. |

## 10. 10-day build timeline (8 days to deadline)

| Day | Milestone |
|---|---|
| **1 (Aug 27)** | Repo setup, Vite+React+Tailwind scaffold, deploy empty shell to Vercel/Netlify, verify WebMCP flag works in Chrome, register one trivial tool end-to-end (`get_form_state` returning a stub). |
| **2 (Aug 28)** | Build the 6-section ALA form with conditional logic, full ARIA labeling, profile store (localStorage or seeded edge function). |
| **3 (Aug 29)** | Declarative API annotations on the form; verify the browser synthesizes the correct JSON Schema via the Tool Inspector extension.【turn1fetch0】 |
| **4 (Aug 30)** | Implement `get_form_state` (the accessibility snapshot), `explain_field`, `validate_section` — the read-only trio. |
| **5 (Aug 31)** | Implement `auto_fill_from_profile`, `attach_document` (with HITL via `requestUserInteraction()`).【turn1fetch1】 Office hours with OpenAI/Netlify today — bring any spec questions. |
| **6 (Sep 1)** | Implement `request_human_review` and `submit_application` (HITL confirmation dialog, mock submission). Wire the tool-activity panel. |
| **7 (Sep 2)** | End-to-end agent flow test in ChatGPT in-app browser AND Chrome with flag. Fix origin-isolation / Permissions-Policy issues. Write README with run instructions, add MIT/Apache license visible in GitHub About section. |
| **8 (Sep 3)** | Record the 3-minute demo video. Write the submission text description answering the 4 required questions. Final deploy. Submit before the Sep 4 1:30am GMT+5:30 deadline. |

---

That's the full breakdown — no code written yet, just the spec. If the assumptions above (Vercel/Netlify, fictional jurisdiction, optional seeded auth, Tool Inspector as primary test surface) are wrong on any axis, flag it and I'll re-cut the relevant sections. Otherwise the next step is the repo scaffold and the Day-1 trivial-tool smoke test to confirm your environment before you invest in the form.


it doesn't matter whether it is a static or dynamic site, right? Yes I can build a convincing multi section conditional benefits form UI with validation states.

For the demo, we should show the real world impact. Yeah, add auth. show screen reader.


Run `npx create-next-app@latest formwise` with the App Router, TypeScript, and Tailwind enabled — Next.js is the right pick here because you need auth (server-side sessions) on top of a client-side WebMCP layer, and the App Router is the supported default as of 2026.【turn0search1】【turn0search0】 Here is the full initialization sequence end-to-end.

## 1. Prerequisites

One line — verify before scaffolding:

```bash
node -v   # >= 18.18 required by create-next-app
npm -v    # or pnpm/yarn, your choice
```

If you don't have Node, install it from nodejs.org or via `nvm install --lts`.

## 2. Scaffold the project

Run from the directory where you want the project to live:

```bash
npx create-next-app@latest formwise \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
```

The flags skip the interactive prompts and lock in the defaults you want: TypeScript, Tailwind v4, ESLint, App Router, `src/` directory, `@/*` import alias, npm.【turn0search1】 When it finishes, it will have created a Git repo automatically and committed the initial scaffold.

> **Why App Router over Pages Router:** App Router is the default from Next.js 13 onward and is the actively developed path; Pages Router is in maintenance and Vercel is steering new projects to App Router.【turn0search8】【turn0search9】 For your use case — server-side auth + a client component hosting WebMCP tools — App Router's Server/Client component split is exactly what you need.

## 3. Verify the structure

```bash
cd formwise
ls -la
```

You should see roughly:

```
formwise/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── public/
├── next.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

`src/app/page.tsx` is your entry route. `layout.tsx` is the root layout — this is where you'll later wrap the app in an auth provider.

## 4. Install WebMCP types and dev dependencies

```bash
npm install webmcp-types
npm install -D @types/node
```

`webmcp-types` gives you TypeScript typings for the Imperative API (`registerTool`, `getTools`, `executeTool`) so the compiler catches schema mistakes before runtime.【turn0search15 from prior turn】

## 5. Smoke-test WebMCP before building anything

This is the most important step — confirm the environment works end-to-end before you invest in the form. Create a client component that registers one trivial tool.

**Critical gotcha:** `document.modelContext.registerTool` is a browser-only API and must run in a Client Component. Do **not** put it in `layout.tsx` or any Server Component, or you'll get a "document is not defined" error. Create `src/app/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    // Guard: API exists + origin-isolated document required by the spec
    if (!("modelContext" in document)) {
      console.error("WebMCP not available — enable chrome://flags/#enable-webmcp-testing");
      return;
    }

    let controller: AbortController | null = null;

    (async () => {
      controller = new AbortController();
      await document.modelContext.registerTool(
        {
          name: "ping",
          description: "Smoke test tool. Returns a greeting string.",
          inputSchema: {
            type: "object",
            properties: { name: { type: "string" } },
          },
          execute: async ({ name }) =>
            JSON.stringify({ msg: `pong, ${name ?? "world"}` }),
        },
        { signal: controller.signal }
      );
      setRegistered(true);
    })();

    return () => controller?.abort(); // unregister on unmount
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Formwise</h1>
      <p className="mt-2">
        WebMCP tool status:{" "}
        {registered ? "✅ registered" : "⏳ registering…"}
      </p>
    </main>
  );
}
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000` in Chrome, then:

1. Navigate to `chrome://flags/#enable-webmcp-testing`, set to **Enabled**, relaunch Chrome.【turn0search1 from prior turn】
2. Reload the page. You should see ✅ registered and no console errors.
3. Install the **Model Context Tool Inspector** Chrome extension (linked from Chrome's WebMCP docs) and prompt the agent: *"Call the ping tool with name 'judge'."* It should return `{"msg":"pong, judge"}`.

If that round-trip works, your entire WebMCP surface is confirmed before you write a single form field.

## 6. Initialize Git and push to GitHub

`create-next-app` already ran `git init` and made the initial commit, so you just connect the remote:

```bash
# On GitHub, create an empty repo named "formwise" (no README, no .gitignore, no license yet)
git remote add origin https://github.com/<your-username>/formwise.git
git branch -M main
git push -u origin main
```

Then add your open-source license now (the rules require it visible in the repo's "About" section):

```bash
# Pick one — MIT or Apache-2.0 are both fine
# Option A: MIT
curl -L https://raw.githubusercontent.com/licenses/license-templates/master/templates/mit.txt -o LICENSE
# Option B: Apache-2.0
# curl -L https://raw.githubusercontent.com/licenses/license-templates/master/templates/apache2.txt -o LICENSE

# Edit LICENSE to add your name + year, then:
git add LICENSE
git commit -m "Add MIT license"
git push
```

On GitHub: **Repo → About (gear icon) ⚙️ → Topics → add `webmcp`, `accessibility`, `nextjs`** and ensure the license is detected in the About panel. This is a hard submission requirement.【turn0search7 from prior turn】

## 7. Auth setup (pick one — recommended: Auth.js v5)

You have two realistic paths for an 8-day build. Both inherit the authenticated session automatically in the browser — the agent gets the same cookie the user has, so WebMCP tools acting on profile data "just work" with no extra plumbing.

**Option A — Auth.js v5 (NextAuth, self-hosted, free, ~30 min setup):**

```bash
npm install next-auth@beta
```

Create `src/auth.ts`:

```ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        // Mock claimant — replace with a real check or seeded list later
        if (creds?.email === "judge@formwise.test") {
          return { id: "1", name: "Jane Claimant", email: creds.email };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
});
```

Mount the route handler at `src/app/api/auth/[...nextauth]/route.ts`:

```ts
export { GET, POST } from "@/auth";
```

Wrap the root layout in a `SessionProvider` and protect the form route via middleware. Auth.js v5 runs `auth()` in middleware, server components, and API routes — exactly the surface you need.【turn0search14】

**Option B — Clerk (hosted, fastest, free tier):**

```bash
npm install @clerk/nextjs
```

Then add `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `.env.local`, wrap `layout.tsx` in `<ClerkProvider>`, and drop `<SignIn />` / `<SignUp />` components on auth routes. Clerk takes ~30 minutes to set up end-to-end versus NextAuth's longer config tail.【turn0search12】【turn0search13】

**Recommendation:** Go with **Auth.js v5** — no external account, no rate limits during the demo, and the Credentials provider lets you seed a "judge" login without an email round-trip. Clerk is the fallback if you hit NextAuth config friction on Day 1.

## 8. Deploy to Vercel

```bash
npm i -g vercel   # if not installed
vercel            # link + deploy a preview
vercel --prod     # promote to production once the smoke test passes
```

Set any auth environment variables (`AUTH_SECRET`, etc.) in the Vercel project dashboard. The production URL is what you'll submit — judges access it via ChatGPT's in-app browser or Chrome with the flag enabled.【turn0search7 from prior turn】

---

### Day 1 completion checklist

- [ ] `create-next-app` scaffold runs, dev server boots at `localhost:3000`
- [ ] `webmcp-types` installed, TypeScript compiles
- [ ] `ping` tool registers and responds via the Tool Inspector extension
- [ ] GitHub repo created, license file committed, "About" panel shows the license
- [ ] Auth provider chosen and wired (login flow works for a seeded user)
- [ ] Preview deploy on Vercel succeeds, WebMCP tool registers on the production URL too

Once the `pong` round-trip works on both `localhost` and the Vercel URL, Day 1 is done. The next move is the 6-section ALA form UI — but that's Day 2. Confirm the smoke test passes before touching the form.