# Formwise – The Agent-Native Government Form

Formwise is an Accessibility Living Allowance (ALA) application form built for the Devpost WebMCP Challenge. It demonstrates a paradigm shift in web accessibility: instead of forcing users to navigate complex UI, the form exposes its exact semantics, validation rules, and logic to AI agents via the Model Context Protocol (MCP) in the browser.

## Why WebMCP? 
Government forms are notoriously hostile to screen readers and users with cognitive disabilities. Traditional web accessibility relies on ARIA attributes and DOM scraping, which is brittle and error-prone for AI agents.

By exposing the form directly as a set of WebMCP tools, Formwise allows a user's AI assistant to:
- Read the strict schema and conditional logic deterministically.
- Securely fetch from a user's personal profile (mocked).
- Fill fields programmatically without searching for DOM nodes or CSS selectors.
- Explain dense bureaucratic policy in plain language.
- Halt and request human verification before sensitive actions (Human-In-The-Loop).

## Key Features
- **Deterministic Form Filling**: Agents use `auto_fill_from_profile` and `set_field` tools to update the React state directly.
- **Live UI Feedback**: When the agent fills a field, the UI pulses with an emerald ring and a "Filled by AI agent" badge, building user trust.
- **Agent Activity Console**: A sleek, collapsible glassmorphic panel shows real-time JSON payloads of exactly what the agent is doing under the hood.
- **Editorial Aesthetic**: A brutalist/minimalist design system that moves away from generic "AI slop" and typical SaaS templates.

## WebMCP Tools Implemented
1. `get_form_state`: Exposes the entire hierarchical schema and current field values.
2. `explain_field`: Provides the policy intent behind confusing fields.
3. `list_profiles`: Returns available user profiles (for the demo).
4. `auto_fill_from_profile`: Fills the form using a selected profile.
5. `set_field`: Allows granular updates to fields not found in a profile (e.g., specific disability categories).
6. `validate_section`: Exposes internal Zod-like validation rules to the agent.
7. `request_human_review`: A Human-In-The-Loop tool that halts the agent, pops a native React modal, and waits for user consent before resolving.
8. `attach_document`: Handles file attachments.
9. `submit_application`: Submits the final payload.

## Getting Started

First, install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

### Testing with an Agent
You can test this application locally using an agent that supports WebMCP (such as the ChatGPT desktop app or Google Chrome with `chrome://flags/#enable-webmcp-testing` enabled).

1. Open `http://localhost:3000` in your WebMCP-enabled browser.
2. Open your agent console (e.g. ChatGPT side panel).
3. Try a prompt like: *"Fill out my ALA form using my profile, attach my doctor's note, and submit it for human review."*

Watch as the agent interacts directly with the Next.js state via WebMCP!

## License
MIT
