# Formwise – The Agent-Native Government Form

Formwise is an Accessibility Living Allowance (ALA) application form built for the Devpost WebMCP Challenge. It demonstrates a paradigm shift in web accessibility: instead of forcing users to navigate complex UI, the form exposes its exact semantics, validation rules, and logic to AI agents via the Model Context Protocol (MCP) in the browser.

## The Paradigm Shift: Why WebMCP? 
In a traditional web application, the user creates an account on the government website, and if they're lucky, the government auto-fills data *they already have on file*. 

**With WebMCP, the paradigm is flipped.** The government website does *not* need to know anything about the user. Instead, the user brings their own **Personal AI Assistant** (running locally on their device, like Apple Intelligence or ChatGPT desktop). This AI assistant already has access to the user's personal context—their emails, their local PDFs, their medical history. 

The government website simply exposes its blank form structure via WebMCP (`get_form_state`, `set_field`, `attach_document`). The user's AI reads the blank form, looks through the user's personal files, and fills out the form on their behalf using `set_field`. 

**What if the AI doesn't have the data?**
Because the AI knows exactly what the form requires (thanks to WebMCP's exposed schemas), if it lacks a piece of information, it simply *asks the user in chat*. E.g., "I see you need to specify your primary condition category. Is it physical or neurological?" The user replies conversationally, and the AI routes that answer directly into the form state.

*(Note: We built `list_profiles` and `auto_fill_from_profile` tools in this repo simply to **simulate** a personal AI assistant having access to context for the sake of the hackathon demo. In a real-world scenario, the AI would just use `set_field` based on its own memory!)*

## Key Features
- **Deterministic Form Filling**: Agents use `set_field` to update the React state directly. No brittle DOM scraping or ARIA hunting.
- **Live UI Feedback**: When the agent fills a field, the UI pulses with an emerald ring and a "Filled by AI agent" badge, building user trust.
- **Agent Activity Console**: A sleek, collapsible glassmorphic panel shows real-time JSON payloads of exactly what the agent is doing under the hood.
- **Human-In-The-Loop**: The `request_human_review` tool halts the agent, navigates the UI to the relevant section, and waits for user consent via a non-blocking toast before resolving.
- **Editorial Aesthetic**: A brutalist/minimalist design system that moves away from generic "AI slop" and typical SaaS templates.

## WebMCP Tools Implemented
1. `get_form_state`: Exposes the entire hierarchical schema and current field values.
2. `explain_field`: Provides the policy intent behind confusing fields.
3. `list_profiles`: Returns available user profiles (simulating local AI context).
4. `auto_fill_from_profile`: Fills the form using a selected profile (simulating local AI context).
5. `set_field`: Allows granular updates to fields.
6. `validate_section`: Exposes internal validation rules to the agent.
7. `request_human_review`: A Human-In-The-Loop tool that pauses the agent until the user approves.
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
2. Open your agent console.
3. Try a prompt like: *"Fill out my ALA form using my profile, attach my doctor's note, and submit it for human review."*

Watch as the agent interacts directly with the Next.js state via WebMCP!

## License
MIT
