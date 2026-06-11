#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const supportedIntegrations = [
  "chatgpt",
  "codex",
  "claude",
  "cursor",
  "cline",
  "openclaw",
  "custom-mcp",
];
const args = process.argv.slice(2);

const defaultProject = {
  projectName: process.env.AGENTDOCK_PROJECT_NAME || path.basename(process.cwd()),
  projectSlug:
    process.env.AGENTDOCK_PROJECT_SLUG ||
    path.basename(process.cwd()).toLowerCase().replaceAll(" ", "-"),
  agentName: process.env.AGENTDOCK_AGENT_NAME || "AgentDock Agent",
  agentRole:
    process.env.AGENTDOCK_AGENT_ROLE ||
    "AI coding agent with access to project context, memory, skills, sessions, and secret references.",
};

const mcpTools = [
  "get_project_context",
  "search_memory",
  "list_skills",
  "list_secret_references",
  "get_agent_setup",
  "create_session",
  "create_handoff",
];

function usage() {
  console.log(`AgentDock CLI

Commands:
  agentdock integrations list
  agentdock integration setup codex
  agentdock integration setup claude
  agentdock integration setup cursor
  agentdock integration setup cline
  agentdock integration setup openclaw
  agentdock integration status
  agentdock init
  agentdock sync
  agentdock generate agents
  agentdock generate chatgpt
  agentdock generate claude
  agentdock generate cursor
  agentdock generate cline
  agentdock generate openclaw
  agentdock mcp start
`);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Wrote ${filePath}`);
}

function mcpConfig() {
  return JSON.stringify(
    {
      mcpServers: {
        agentdock: {
          url: "http://localhost:8787",
          tools: mcpTools,
        },
      },
    },
    null,
    2
  );
}

function contextMarkdown(input) {
  return `# AgentDock Context

Project: ${input.projectName}
Project key: ${input.projectSlug}
Agent: ${input.agentName}
Role: ${input.agentRole}

## Live Context Sources
- Project profile and working conventions
- Memory search results scoped to the signed-in user
- Skills selected for this agent
- Session history and handoffs
- Secret references only, never raw secret values

## Security Rules
- Do not request or print raw secret values.
- Use secret references such as agentdock://secrets/OPENAI_API_KEY when a tool needs a credential.
- Do not run local shell commands from the browser.
- Use the AgentDock CLI, MCP server, or approved local bridge for local setup.
`;
}

function integrationMarkdown(type, input) {
  const context = contextMarkdown(input);

  if (type === "chatgpt") {
    return `# ChatGPT Project Brain

Paste this into ChatGPT project instructions or a reusable note.

${context}
## ChatGPT Setup
1. Copy the shared project brain.
2. Paste it into the ChatGPT project or custom instructions field.
3. Keep using AgentDock as the source of truth for updates.

Generated files:
- CHATGPT.md
- .agentdock/context.md
`;
  }

  if (type === "codex") {
    return `# AGENTS.md

You are working inside a repository linked to AgentDock.

${context}
## Codex Setup
\`\`\`bash
agentdock init
agentdock sync
agentdock generate agents
codex
\`\`\`

Optional MCP config:
\`\`\`json
${mcpConfig()}
\`\`\`
`;
  }

  if (type === "claude") {
    return `# CLAUDE.md

Claude Code should use AgentDock as the source of project setup, memory, skills, and handoffs.

${context}
## Claude Code Setup
\`\`\`bash
agentdock init
agentdock sync
agentdock generate claude
\`\`\`

MCP config:
\`\`\`json
${mcpConfig()}
\`\`\`
`;
  }

  if (type === "cursor") {
    return `# .cursor/rules/project.md

Use this project rule with Cursor.

${context}
## Cursor Setup
\`\`\`bash
agentdock generate cursor
\`\`\`
`;
  }

  if (type === "cline") {
    return `# CLINE.md

Cline should use AgentDock as the source of project context, memory, skills, and handoffs.

${context}
## Cline Setup
\`\`\`bash
agentdock generate cline
\`\`\`

MCP config:
\`\`\`json
${mcpConfig()}
\`\`\`
`;
  }

  if (type === "openclaw") {
    return `# OPENCLAW.md

OpenClaw should use AgentDock context for this repository.

${context}
## OpenClaw Setup
\`\`\`bash
agentdock generate openclaw
agentdock mcp start
\`\`\`

MCP config:
\`\`\`json
${mcpConfig()}
\`\`\`
`;
  }

  return `# AgentDock Custom MCP Agent

Server URL: http://localhost:8787

Available tools:
${mcpTools.map((tool) => `- ${tool}`).join("\n")}

Example config:
\`\`\`json
${mcpConfig()}
\`\`\`
`;
}

function initProject() {
  fs.mkdirSync(".agentdock", { recursive: true });
  writeFile(
    ".agentdock/project.json",
    JSON.stringify(
      {
        projectName: defaultProject.projectName,
        projectSlug: defaultProject.projectSlug,
        linkedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
}

function syncProject() {
  fs.mkdirSync(".agentdock", { recursive: true });
  writeFile(".agentdock/context.md", contextMarkdown(defaultProject));
}

function setupIntegration(type) {
  if (!supportedIntegrations.includes(type) || type === "custom-mcp") {
    console.error(`Unsupported setup integration: ${type}`);
    process.exit(1);
  }

  fs.mkdirSync(".agentdock", { recursive: true });
  writeFile(".agentdock/context.md", contextMarkdown(defaultProject));

  if (type === "codex") {
    writeFile("AGENTS.md", integrationMarkdown("codex", defaultProject));
  }

  if (type === "chatgpt") {
    writeFile("CHATGPT.md", integrationMarkdown("chatgpt", defaultProject));
  }

  if (type === "claude") {
    writeFile("CLAUDE.md", integrationMarkdown("claude", defaultProject));
    writeFile(".agentdock/claude-mcp.json", mcpConfig());
  }

  if (type === "cursor") {
    writeFile(".cursor/rules/project.md", integrationMarkdown("cursor", defaultProject));
  }

  if (type === "cline") {
    writeFile("CLINE.md", integrationMarkdown("cline", defaultProject));
    writeFile(".agentdock/cline-mcp.json", mcpConfig());
  }

  if (type === "openclaw") {
    writeFile("OPENCLAW.md", integrationMarkdown("openclaw", defaultProject));
    writeFile(".agentdock/openclaw-context.md", contextMarkdown(defaultProject));
    writeFile(".agentdock/openclaw-mcp.json", mcpConfig());
  }

  console.log("Generated files include secret references only. Raw secrets are not written.");
}

async function status() {
  const checks = [
    ["logged in", Boolean(process.env.AGENTDOCK_TOKEN)],
    ["project linked", fs.existsSync(".agentdock/project.json")],
    ["local .agentdock folder exists", fs.existsSync(".agentdock")],
    ["AGENTS.md exists", fs.existsSync("AGENTS.md")],
    ["CHATGPT.md exists", fs.existsSync("CHATGPT.md")],
    ["CLAUDE.md exists", fs.existsSync("CLAUDE.md")],
    ["Cursor rules exist", fs.existsSync(".cursor/rules/project.md")],
    ["CLINE.md exists", fs.existsSync("CLINE.md")],
    ["OPENCLAW.md exists", fs.existsSync("OPENCLAW.md")],
  ];

  let mcpAvailable = false;
  try {
    const response = await fetch("http://localhost:8787/health", {
      signal: AbortSignal.timeout(800),
    });
    mcpAvailable = response.ok;
  } catch {
    mcpAvailable = false;
  }

  checks.splice(2, 0, ["MCP server available", mcpAvailable]);

  for (const [label, ok] of checks) {
    console.log(`${ok ? "OK " : "NO "} ${label}`);
  }
}

async function main() {
  if (args.length === 0) return usage();

  if (args[0] === "integrations" && args[1] === "list") {
    console.log("Supported integrations:");
    for (const item of supportedIntegrations) console.log(`- ${item}`);
    console.log("- local-bridge (coming next)");
    return;
  }

  if (args[0] === "integration" && args[1] === "setup") {
    return setupIntegration(args[2]);
  }

  if (args[0] === "integration" && args[1] === "status") {
    return status();
  }

  if (args[0] === "init") return initProject();
  if (args[0] === "sync") return syncProject();

  if (args[0] === "generate") {
    if (args[1] === "chatgpt") return setupIntegration("chatgpt");
    if (args[1] === "agents") return setupIntegration("codex");
    if (args[1] === "claude") return setupIntegration("claude");
    if (args[1] === "cursor") return setupIntegration("cursor");
    if (args[1] === "cline") return setupIntegration("cline");
    if (args[1] === "openclaw") return setupIntegration("openclaw");
  }

  if (args[0] === "mcp" && args[1] === "start") {
    console.log("AgentDock MCP server URL: http://localhost:8787");
    console.log("MCP server implementation is expected in the local bridge/runtime package.");
    console.log("Available tools:");
    for (const tool of mcpTools) console.log(`- ${tool}`);
    return;
  }

  usage();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
