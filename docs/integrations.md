# AgentDock Integrations

AgentDock connects real AI coding agents to live project context, memory,
skills, sessions, handoffs, and secret references. It does not run local shell
commands from the browser, and generated files never include raw secret values.

## CLI Setup

From a linked project root:

```bash
agentdock init
agentdock sync
agentdock integrations list
agentdock integration status
```

`agentdock init` creates `.agentdock/project.json`. `agentdock sync` creates
`.agentdock/context.md` with the current project and agent setup.

## Codex Setup

Generate Codex files:

```bash
agentdock integration setup codex
```

Generated files:

- `AGENTS.md`
- `.agentdock/context.md`

Run Codex from the project root after generation:

```bash
agentdock init
agentdock sync
agentdock generate agents
codex
```

## Claude Code Setup

Generate Claude Code files:

```bash
agentdock integration setup claude
```

Generated files:

- `CLAUDE.md`
- `.agentdock/context.md`
- `.agentdock/claude-mcp.json`

Use the MCP snippet with Claude Code:

```json
{
  "mcpServers": {
    "agentdock": {
      "url": "http://localhost:8787",
      "tools": [
        "get_project_context",
        "search_memory",
        "list_skills",
        "list_secret_references",
        "get_agent_setup",
        "create_session",
        "create_handoff"
      ]
    }
  }
}
```

## Cursor Setup

Generate Cursor rules:

```bash
agentdock integration setup cursor
```

Generated files:

- `.cursor/rules/project.md`
- `.agentdock/context.md`

Open the repository in Cursor and ask Cursor to follow the project rules.

## ChatGPT Setup

Generate a reusable project brain export:

```bash
agentdock integration setup chatgpt
```

Generated files:

- `CHATGPT.md`
- `.agentdock/context.md`

Copy the exported context into ChatGPT project instructions or a reusable note.

## Cline Setup

Generate Cline setup files:

```bash
agentdock integration setup cline
```

Generated files:

- `CLINE.md`
- `.agentdock/context.md`
- `.agentdock/cline-mcp.json`

Use the MCP snippet or file export so Cline can reuse the same shared context.

## OpenClaw Setup

Generate OpenClaw setup:

```bash
agentdock integration setup openclaw
agentdock mcp start
```

Generated files:

- `OPENCLAW.md`
- `.agentdock/openclaw-context.md`
- `.agentdock/openclaw-mcp.json`

Connect OpenClaw to the local AgentDock MCP server at
`http://localhost:8787`.

## Custom MCP Agent

MCP server URL:

```text
http://localhost:8787
```

Available tools:

- `get_project_context`
- `search_memory`
- `list_skills`
- `list_secret_references`
- `get_agent_setup`
- `create_session`
- `create_handoff`

Example config:

```json
{
  "mcpServers": {
    "agentdock": {
      "url": "http://localhost:8787",
      "tools": [
        "get_project_context",
        "search_memory",
        "list_skills",
        "list_secret_references",
        "get_agent_setup",
        "create_session",
        "create_handoff"
      ]
    }
  }
}
```

## Local Bridge

The Local Bridge is coming next. It will let the AgentDock web app communicate
with the user's local machine to open projects, run approved agent CLI commands,
and sync files safely.

The browser app should not directly execute local commands. Local execution must
go through the CLI or a paired local bridge with explicit user approval.

## Security Notes

- Supabase Auth and RLS protect persisted integration config history.
- `integration_configs.user_id` is always scoped to the signed-in user.
- Generated files include secret references such as `agentdock://secrets/OPENAI_API_KEY`,
  not raw secret values.
- MCP tools should return references and metadata only for secrets.
- Browser pages generate, copy, and download text. They do not run shell
  commands.
- Use `agentdock integration status` to check login state, project linkage, MCP
  server availability, generated files, and the local `.agentdock` folder.
