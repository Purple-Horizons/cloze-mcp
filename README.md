# Cloze MCP Server

[![npm version](https://badge.fury.io/js/%40purplehorizons%2Fcloze-mcp.svg)](https://www.npmjs.com/package/@purplehorizons/cloze-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> ⚠️ **BETA / UNTESTED** — This is an early release. Use at your own risk. API may change. Contributions and bug reports welcome!

An open-source [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server for [Cloze CRM](https://www.cloze.com/). Give AI agents like Claude access to your contacts, companies, deals, and communications.

## Features

- 🔍 **Search & Retrieve** — Find people, companies, and projects in your CRM
- 📞 **Contact Info** — Get emails, phone numbers, addresses on demand
- 📊 **Deal Pipeline** — Query projects and deals by stage
- 🔒 **Secure** — Your API key stays local, never sent to third parties

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
- "What's John Smith's phone number?"
- "Find all contacts at Acme Corp"
- "Show me my deals closing this month"
- "Look up the company info for example.com"

## Available Tools

| Tool | Description |
|------|-------------|
| `cloze_find_people` | Search for contacts by name, email, or phone |
| `cloze_get_person` | Get full details for a specific person |
| `cloze_find_companies` | Search for companies by name or domain |
| `cloze_get_company` | Get full details for a specific company |
| `cloze_find_projects` | Search for projects/deals by name |
| `cloze_get_project` | Get full details for a specific project |
| `cloze_get_profile` | Get your Cloze user profile |

## Development

```bash
# Clone the repo
git clone https://github.com/Purple-Horizons/cloze-mcp.git
cd cloze-mcp

# Install dependencies
npm install

# Build
npm run build

# Run locally
CLOZE_API_KEY=your-key node dist/index.js
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOZE_API_KEY` | Yes | Your Cloze API key |

## Roadmap

- [x] MVP: Read-only tools (find, get)
- [ ] Write operations (create contacts, log communications)
- [ ] Analytics queries
- [ ] Webhook subscriptions
- [ ] OAuth 2.0 for public integrations

## Contributing

Contributions welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT © [Purple Horizons](https://purplehorizons.io)

---

Built with ❤️ by [Purple Horizons](https://purplehorizons.io) for the AI agent community.
