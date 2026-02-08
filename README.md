# Cloze MCP Server

[![npm version](https://badge.fury.io/js/%40purplehorizons%2Fcloze-mcp.svg)](https://www.npmjs.com/package/@purplehorizons/cloze-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An open-source [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server for [Cloze CRM](https://www.cloze.com/). Give AI agents like Claude access to your contacts, companies, deals, metadata, and timeline.

## Features

- 🔍 **Search & Retrieve** — Find people, companies, and projects (basic + advanced filters + feeds)
- 🧠 **Metadata Insight** — Fetch stages, segments, steps, custom fields, team members/roles, and saved views
- 📝 **Timeline Writes** — Create To-Dos and log communications directly from agents
- 📊 **Deal Pipeline** — Query projects and deals by stage and scope
- 🔒 **Secure** — Your API key stays local, never sent to third parties
- ✅ **Tested** — Vitest unit tests cover tool routing + validation (run `npm test`)

## Quick Start

### 1. Get your Cloze API Key

Go to [Cloze Settings → API](https://www.cloze.com/app/settings/api) and create an API key.

### 2. Configure your MCP client

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "cloze": {
      "command": "npx",
      "args": ["-y", "@purplehorizons/cloze-mcp"],
      "env": {
        "CLOZE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**Moltbot** (`~/.clawdbot/config/mcporter.json`):

```json
{
  "mcpServers": {
    "cloze": {
      "command": "npx",
      "args": ["-y", "@purplehorizons/cloze-mcp"],
      "env": {
        "CLOZE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### 3. Start using it

Ask your AI assistant things like:
- "Show me all buyers in the Future stage assigned to Collette"
- "List the pipeline steps for the Project segment"
- "Create a reminder to call Sabor Havana tomorrow"
- "Stream the latest company changes since last week"

## Available Tools

### Core lookups
| Tool | Description |
|------|-------------|
| `cloze_find_people`, `cloze_get_person` | Basic contact search + detail
| `cloze_find_companies`, `cloze_get_company` | Company search + detail
| `cloze_find_projects`, `cloze_get_project` | Project/deal search + detail
| `cloze_get_profile` | Verify API connectivity / user info

### Metadata / taxonomy
| Tool | Description |
|------|-------------|
| `cloze_get_custom_fields` | List custom fields (optionally by relation type)
| `cloze_get_people_stages`, `cloze_get_project_stages` | Stage taxonomies
| `cloze_get_people_segments`, `cloze_get_company_segments`, `cloze_get_project_segments` | Segment lists
| `cloze_get_steps` | Pipeline steps (filter by segment/stage)
| `cloze_get_views` | Saved views / audiences
| `cloze_list_team_members`, `cloze_list_team_roles` | Team roster + role labels

### Advanced find + feeds
| Tool | Description |
|------|-------------|
| `cloze_people_find_advanced` | GET /v1/people/find with pagination, filters, sorting
| `cloze_companies_find_advanced` | Same for companies
| `cloze_projects_find_advanced` | Same for projects/deals
| `cloze_people_feed` | Cursor-based change feed for people (supports modifiedAfter, includeAuditedChanges)
| `cloze_companies_feed` | Company feed
| `cloze_projects_feed` | Project feed

### Timeline writes
| Tool | Description |
|------|-------------|
| `cloze_create_todo` | Create a Cloze To-Do/reminder (subject + optional when/participants/assignee)
| `cloze_log_communication` | Log calls, texts, emails, meetings, etc. onto the timeline

## Development

```bash
# Clone the repo
git clone https://github.com/Purple-Horizons/cloze-mcp.git
cd cloze-mcp

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Run locally (after build)
CLOZE_API_KEY=your-key node dist/index.js
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOZE_API_KEY` | Yes | Your Cloze API key |

## Roadmap

- [x] MVP: Read operations (find/get)
- [x] Metadata helpers (stages, segments, custom fields, steps, team)
- [x] Advanced search + feeds
- [x] Timeline writes (todos + communications)
- [ ] Analytics queries
- [ ] Webhook subscriptions
- [ ] OAuth 2.0 for public integrations

## Contributing

Contributions welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT © [Purple Horizons](https://purplehorizons.io)

---

Built with ❤️ by [Purple Horizons](https://purplehorizons.io) for the AI agent community.
