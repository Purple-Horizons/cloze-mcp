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
  {
    name: "cloze_get_custom_fields",
    description: "List all custom fields available in the Cloze workspace, optionally filtered by relation type.",
    inputSchema: {
      type: "object",
      properties: {
        relationType: {
          type: "string",
          enum: ["person", "company", "project"],
          description: "Limit results to custom fields for a specific relation type.",
        },
      },
    },
  },
  {
    name: "cloze_get_people_stages",
    description: "Retrieve the stage taxonomy for people/companies.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "cloze_get_project_stages",
    description: "Retrieve the stage taxonomy for projects/deals.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "cloze_get_people_segments",
    description: "List contact segments configured in the workspace.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "cloze_get_company_segments",
    description: "List company segments configured in the workspace.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "cloze_get_project_segments",
    description: "List project segments configured in the workspace.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "cloze_get_steps",
    description:
      "List available pipeline steps, optionally filtered by segment and stage for more precise guidance.",
    inputSchema: {
      type: "object",
      properties: {
        segment: {
          type: "string",
          description: "Segment identifier or label to filter steps.",
        },
        stage: {
          type: "string",
          description: "Stage key to filter steps within a segment.",
        },
      },
    },
  },
  {
    name: "cloze_get_views",
    description: "Retrieve saved views/audiences for people, companies, and projects.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "cloze_list_team_members",
    description: "List team members for the current Cloze workspace (name + email).",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "cloze_list_team_roles",
    description: "List team roles defined in Cloze (label + id).",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "cloze_people_find_advanced",
    description:
      "Run advanced people search with stage/segment filters, pagination, and sorting (wraps GET /v1/people/find).",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Freeform query or keyword." },
        stage: { type: "string", description: "Stage key (lead, future, current, past, out)." },
        segment: { type: "string", description: "Segment id or label." },
        assignee: { type: "string", description: "Filter to who it’s assigned to (email)." },
        assigned: { type: "boolean", description: "Whether to only show assigned records." },
        pageSize: { type: "number", description: "Results per page (<=1000)." },
        pageNumber: { type: "number", description: "Page number (1-indexed)." },
        sort: { type: "string", description: "Sort key (lastchanged, value, name, etc.)." },
      },
    },
  },
  {
    name: "cloze_companies_find_advanced",
    description: "Advanced company search with filters/pagination.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        stage: { type: "string" },
        segment: { type: "string" },
        assignee: { type: "string" },
        assigned: { type: "boolean" },
        pageSize: { type: "number" },
        pageNumber: { type: "number" },
        sort: { type: "string" },
      },
    },
  },
  {
    name: "cloze_projects_find_advanced",
    description: "Advanced project/deal search with filters/pagination.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        stage: { type: "string" },
        segment: { type: "string" },
        assignee: { type: "string" },
        assigned: { type: "boolean" },
        pageSize: { type: "number" },
        pageNumber: { type: "number" },
        sort: { type: "string" },
      },
    },
  },
  {
    name: "cloze_people_feed",
    description:
      "Stream/bulk people feed results using cursors (GET /v1/people/feed). Supports modifiedAfter + includeAuditedChanges.",
    inputSchema: {
      type: "object",
      properties: {
        cursor: { type: "string", description: "Cursor from previous call." },
        stage: { type: "string" },
        segment: { type: "string" },
        scope: {
          type: "string",
          description: "local, team, or hierarchy path",
        },
        pageSize: { type: "number" },
        modifiedAfter: {
          type: ["string", "number"],
          description: "UTC ms timestamp or 'now'.",
        },
        includeAuditedChanges: { type: "boolean" },
      },
    },
  },
  {
    name: "cloze_companies_feed",
    description: "Stream/bulk company feed using cursors.",
    inputSchema: {
      type: "object",
      properties: {
        cursor: { type: "string" },
        stage: { type: "string" },
        segment: { type: "string" },
        scope: { type: "string" },
        pageSize: { type: "number" },
        modifiedAfter: { type: ["string", "number"] },
        includeAuditedChanges: { type: "boolean" },
      },
    },
  },
  {
    name: "cloze_projects_feed",
    description: "Stream/bulk project feed using cursors.",
    inputSchema: {
      type: "object",
      properties: {
        cursor: { type: "string" },
        stage: { type: "string" },
        segment: { type: "string" },
        scope: { type: "string" },
        pageSize: { type: "number" },
        modifiedAfter: { type: ["string", "number"] },
        includeAuditedChanges: { type: "boolean" },
      },
    },
  },
  {
    name: "cloze_update_person",
    description:
      "Update an existing person in Cloze. Can change visibility (hidden to clean up duplicates), stage, segment, step, job title, company, or add/update emails, phones, and addresses. Requires at least a name (first+last) or email as identifier.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Cloze syncKey/ID of the person." },
        first: { type: "string", description: "First name (used as identifier)." },
        last: { type: "string", description: "Last name (used as identifier)." },
        emails: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              work: { type: "boolean" },
            },
            required: ["value"],
          },
          description: "Email addresses.",
        },
        phones: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              mobile: { type: "boolean" },
            },
            required: ["value"],
          },
          description: "Phone numbers.",
        },
        visibility: {
          type: "string",
          enum: ["visible", "hidden"],
          description: "Set to 'hidden' to soft-delete/hide a duplicate.",
        },
        stage: { type: "string", description: "Stage key (lead, future, current, past, out)." },
        segment: { type: "string", description: "Segment label or id." },
        step: { type: "string", description: "Pipeline step." },
        jobtitle: { type: "string", description: "Job title." },
        company: { type: "string", description: "Company name." },
      },
    },
  },
  {
    name: "cloze_create_todo",
    description: "Create a Cloze To-Do/reminder on the timeline.",
    inputSchema: {
      type: "object",
      properties: {
        subject: { type: "string", description: "Title of the task." },
        when: {
          type: ["string", "number"],
          description: "ISO date or UTC ms timestamp.",
        },
        participants: {
          type: "array",
          items: { type: "string" },
          description: "Emails/phones tied to the task.",
        },
        assignee: {
          type: "string",
          description: "Assign to team member (email).",
        },
        body: { type: "string", description: "Optional note/body." },
      },
      required: ["subject"],
    },
  },
  {
    name: "cloze_log_communication",
    description: "Log a call/text/email/meeting on the Cloze timeline.",
    inputSchema: {
      type: "object",
      properties: {
        style: {
          type: "string",
          enum: ["email", "call", "text", "meeting", "direct", "postal", "postal-bulk"],
          description: "Type of communication.",
        },
        subject: { type: "string", description: "Summary/title." },
        date: {
          type: ["string", "number"],
          description: "When it happened (ISO or UTC ms).",
        },
        from: {
          type: "string",
          description: "Actor initiating (email/phone/app link).",
        },
        recipients: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              value: { type: "string" },
              role: { type: "string", enum: ["to", "cc", "bcc", "from"] },
            },
            required: ["value"],
          },
        },
        references: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              value: { type: "string" },
            },
            required: ["value"],
          },
        },
        body: { type: "string" },
        bodytype: { type: "string", enum: ["text", "html"] },
      },
      required: ["style", "subject"],
    },
  },
];

// ==================== Tool Handlers ====================

// Workaround: mcporter passes args as {"{\"key\"": "\"value\""} instead of {key: value}
function fixArgs(raw: Record<string, unknown>): Record<string, unknown> {
  const keys = Object.keys(raw);
  if (keys.length > 0 && keys[0].startsWith('{')) {
    try {
      const rebuilt = keys.map((k, i) => k + ':' + Object.values(raw)[i]).join(',');
      return JSON.parse(rebuilt);
    } catch { return raw; }
  }
  return raw;
}

export async function handleToolCall(
  client: ClozeClient,
  toolName: string,
  args: Record<string, unknown>
): Promise<unknown> {
  args = fixArgs(args);
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

    case "cloze_get_custom_fields": {
      const relationType = args.relationType as "person" | "company" | "project" | undefined;
      return client.getCustomFields(relationType);
    }

    case "cloze_get_people_stages": {
      return client.getPeopleStages();
    }

    case "cloze_get_project_stages": {
      return client.getProjectStages();
    }

    case "cloze_get_people_segments": {
      return client.getPeopleSegments();
    }

    case "cloze_get_company_segments": {
      return client.getCompanySegments();
    }

    case "cloze_get_project_segments": {
      return client.getProjectSegments();
    }

    case "cloze_get_steps": {
      const segment = args.segment as string | undefined;
      const stage = args.stage as string | undefined;
      return client.getSteps({ segment, stage });
    }

    case "cloze_get_views": {
      return client.getViews();
    }

    case "cloze_list_team_members": {
      return client.listTeamMembers();
    }

    case "cloze_list_team_roles": {
      return client.listTeamRoles();
    }

    case "cloze_people_find_advanced": {
      return client.findPeopleAdvanced(args);
    }

    case "cloze_companies_find_advanced": {
      return client.findCompaniesAdvanced(args);
    }

    case "cloze_projects_find_advanced": {
      return client.findProjectsAdvanced(args);
    }

    case "cloze_people_feed": {
      return client.feedPeople(args);
    }

    case "cloze_companies_feed": {
      return client.feedCompanies(args);
    }

    case "cloze_projects_feed": {
      return client.feedProjects(args);
    }

    case "cloze_update_person": {
      return client.updatePerson(args);
    }

    case "cloze_create_todo": {
      if (!args.subject) {
        throw new Error("'subject' is required");
      }
      return client.createTodo(args as Record<string, unknown>);
    }

    case "cloze_log_communication": {
      if (!args.style || !args.subject) {
        throw new Error("'style' and 'subject' are required");
      }
      return client.logCommunication(args as Record<string, unknown>);
    }

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
