/**
 * MCP Tool Definitions and Handlers
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { ClozeClient } from "./cloze-client.js";

// ==================== Tool Definitions ====================

export const tools: Tool[] = [
  {
    name: "cloze_find_people",
    description:
      "Search for people (contacts) in Cloze by name, email, or phone number. Returns a list of matching contacts with basic info.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query - can be a name, email address, or phone number",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default: 10, max: 50)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "cloze_get_person",
    description:
      "Get full details for a specific person by their Cloze ID or email address. Returns all contact info including emails, phones, addresses, jobs, and custom fields.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The Cloze person ID",
        },
        email: {
          type: "string",
          description: "Email address (alternative to ID)",
        },
      },
    },
  },
  {
    name: "cloze_find_companies",
    description:
      "Search for companies in Cloze by name or domain. Returns a list of matching companies with basic info.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query - can be a company name or domain",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default: 10, max: 50)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "cloze_get_company",
    description:
      "Get full details for a specific company by their Cloze ID or domain. Returns all company info including addresses, phones, and custom fields.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The Cloze company ID",
        },
        domain: {
          type: "string",
          description: "Company domain (alternative to ID)",
        },
      },
    },
  },
  {
    name: "cloze_find_projects",
    description:
      "Search for projects (deals) in Cloze by name. Returns a list of matching projects with basic info including stage and value.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query - project or deal name",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default: 10, max: 50)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "cloze_get_project",
    description:
      "Get full details for a specific project by its Cloze ID. Returns all project info including stage, value, related contacts, and custom fields.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "The Cloze project ID",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "cloze_get_profile",
    description:
      "Get the current Cloze user's profile information. Useful for verifying API connectivity and getting account details.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// ==================== Tool Handlers ====================

export async function handleToolCall(
  client: ClozeClient,
  toolName: string,
  args: Record<string, unknown>
): Promise<unknown> {
  switch (toolName) {
    case "cloze_find_people": {
      const query = args.query as string;
      const limit = (args.limit as number) || 10;
      return client.findPeople(query, Math.min(limit, 50));
    }

    case "cloze_get_person": {
      const id = args.id as string | undefined;
      const email = args.email as string | undefined;
      if (email) {
        return client.getPersonByEmail(email);
      }
      if (id) {
        return client.getPerson(id);
      }
      throw new Error("Either 'id' or 'email' is required");
    }

    case "cloze_find_companies": {
      const query = args.query as string;
      const limit = (args.limit as number) || 10;
      return client.findCompanies(query, Math.min(limit, 50));
    }

    case "cloze_get_company": {
      const id = args.id as string | undefined;
      const domain = args.domain as string | undefined;
      if (domain) {
        return client.getCompanyByDomain(domain);
      }
      if (id) {
        return client.getCompany(id);
      }
      throw new Error("Either 'id' or 'domain' is required");
    }

    case "cloze_find_projects": {
      const query = args.query as string;
      const limit = (args.limit as number) || 10;
      return client.findProjects(query, Math.min(limit, 50));
    }

    case "cloze_get_project": {
      const id = args.id as string;
      if (!id) {
        throw new Error("'id' is required");
      }
      return client.getProject(id);
    }

    case "cloze_get_profile": {
      return client.getProfile();
    }

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
