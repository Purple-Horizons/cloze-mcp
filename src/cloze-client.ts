/**
 * Cloze API Client
 * 
 * Handles all HTTP communication with the Cloze API.
 * Base URL: https://api.cloze.com
 */

const BASE_URL = "https://api.cloze.com";

export interface ClozeResponse<T> {
  errorcode?: string;
  message?: string;
  [key: string]: unknown;
}

export class ClozeClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private buildQuery(params?: Record<string, string | number | boolean | undefined>) {
    if (!params) return "";
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      search.set(key, String(value));
    }
    const qs = search.toString();
    return qs ? `?${qs}` : "";
  }

  private async request<T>(
    method: "GET" | "POST",
    endpoint: string,
    body?: Record<string, unknown>
  ): Promise<T> {
    const url = new URL(endpoint, BASE_URL);
    url.searchParams.set("api_key", this.apiKey);

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body && method === "POST") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      throw new Error(`Cloze API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errorcode && data.errorcode !== 0) {
      throw new Error(`Cloze API error: ${data.errorcode} - ${data.message ?? "Unknown"}`);
    }

    return data as T;
  }

  // ==================== People ====================

  async findPeople(query: string, limit = 10): Promise<unknown> {
    const qs = this.buildQuery({ freeformquery: query, pagesize: limit });
    return this.request("GET", `/v1/people/find${qs}`);
  }

  async findPeopleAdvanced(params: Record<string, unknown>): Promise<unknown> {
    const query = this.buildQuery({
      pagesize: params.pageSize as number | undefined,
      pagenumber: params.pageNumber as number | undefined,
      freeformquery: params.query as string | undefined,
      stage: params.stage as string | undefined,
      segment: params.segment as string | undefined,
      assignee: params.assignee as string | undefined,
      assigned: params.assigned as boolean | undefined,
      sort: params.sort as string | undefined,
    });
    return this.request("GET", `/v1/people/find${query}`);
  }

  async feedPeople(params: Record<string, unknown>): Promise<unknown> {
    const query = this.buildQuery({
      cursor: params.cursor as string | undefined,
      stage: params.stage as string | undefined,
      segment: params.segment as string | undefined,
      scope: params.scope as string | undefined,
      pagesize: params.pageSize as number | undefined,
      modifiedafter: params.modifiedAfter as string | number | undefined,
      includeauditedchanges: params.includeAuditedChanges as boolean | undefined,
    });
    return this.request("GET", `/v1/people/feed${query}`);
  }

  async getPerson(id: string): Promise<unknown> {
    return this.request("POST", "/v1/people/get", {
      id,
    });
  }

  async getPersonByEmail(email: string): Promise<unknown> {
    return this.request("POST", "/v1/people/get", {
      email,
    });
  }

  // ==================== Companies ====================

  async findCompanies(query: string, limit = 10): Promise<unknown> {
    const qs = this.buildQuery({ freeformquery: query, pagesize: limit });
    return this.request("GET", `/v1/companies/find${qs}`);
  }

  async findCompaniesAdvanced(params: Record<string, unknown>): Promise<unknown> {
    const query = this.buildQuery({
      pagesize: params.pageSize as number | undefined,
      pagenumber: params.pageNumber as number | undefined,
      freeformquery: params.query as string | undefined,
      stage: params.stage as string | undefined,
      segment: params.segment as string | undefined,
      assignee: params.assignee as string | undefined,
      assigned: params.assigned as boolean | undefined,
      sort: params.sort as string | undefined,
    });
    return this.request("GET", `/v1/companies/find${query}`);
  }

  async feedCompanies(params: Record<string, unknown>): Promise<unknown> {
    const query = this.buildQuery({
      cursor: params.cursor as string | undefined,
      stage: params.stage as string | undefined,
      segment: params.segment as string | undefined,
      scope: params.scope as string | undefined,
      pagesize: params.pageSize as number | undefined,
      modifiedafter: params.modifiedAfter as string | number | undefined,
      includeauditedchanges: params.includeAuditedChanges as boolean | undefined,
    });
    return this.request("GET", `/v1/companies/feed${query}`);
  }

  async getCompany(id: string): Promise<unknown> {
    return this.request("POST", "/v1/companies/get", {
      id,
    });
  }

  async getCompanyByDomain(domain: string): Promise<unknown> {
    return this.request("POST", "/v1/companies/get", {
      domain,
    });
  }

  // ==================== Projects ====================

  async findProjects(query: string, limit = 10): Promise<unknown> {
    const qs = this.buildQuery({ freeformquery: query, pagesize: limit });
    return this.request("GET", `/v1/projects/find${qs}`);
  }

  async findProjectsAdvanced(params: Record<string, unknown>): Promise<unknown> {
    const query = this.buildQuery({
      pagesize: params.pageSize as number | undefined,
      pagenumber: params.pageNumber as number | undefined,
      freeformquery: params.query as string | undefined,
      stage: params.stage as string | undefined,
      segment: params.segment as string | undefined,
      assignee: params.assignee as string | undefined,
      assigned: params.assigned as boolean | undefined,
      sort: params.sort as string | undefined,
    });
    return this.request("GET", `/v1/projects/find${query}`);
  }

  async feedProjects(params: Record<string, unknown>): Promise<unknown> {
    const query = this.buildQuery({
      cursor: params.cursor as string | undefined,
      stage: params.stage as string | undefined,
      segment: params.segment as string | undefined,
      scope: params.scope as string | undefined,
      pagesize: params.pageSize as number | undefined,
      modifiedafter: params.modifiedAfter as string | number | undefined,
      includeauditedchanges: params.includeAuditedChanges as boolean | undefined,
    });
    return this.request("GET", `/v1/projects/feed${query}`);
  }

  async getProject(id: string): Promise<unknown> {
    return this.request("POST", "/v1/projects/get", {
      id,
    });
  }

  // ==================== User ====================

  async getProfile(): Promise<unknown> {
    return this.request("GET", "/v1/user/profile");
  }

  async getCustomFields(relationType?: "person" | "company" | "project"): Promise<unknown> {
    const url = relationType
      ? `/v1/user/fields?relationtype=${relationType}`
      : "/v1/user/fields";
    return this.request("GET", url);
  }

  async getPeopleStages(): Promise<unknown> {
    return this.request("GET", "/v1/user/stages/people");
  }

  async getProjectStages(): Promise<unknown> {
    return this.request("GET", "/v1/user/stages/projects");
  }

  async getPeopleSegments(): Promise<unknown> {
    return this.request("GET", "/v1/user/segments/people");
  }

  async getCompanySegments(): Promise<unknown> {
    return this.request("GET", "/v1/user/segments/companies");
  }

  async getProjectSegments(): Promise<unknown> {
    return this.request("GET", "/v1/user/segments/projects");
  }

  async getSteps(params?: { segment?: string; stage?: string }): Promise<unknown> {
    const query = this.buildQuery({
      segment: params?.segment,
      stage: params?.stage,
    });
    return this.request("GET", `/v1/user/steps${query}`);
  }

  async getViews(): Promise<unknown> {
    return this.request("GET", "/v1/user/views");
  }

  async listTeamMembers(): Promise<unknown> {
    return this.request("GET", "/v1/team/members/list");
  }

  async listTeamRoles(): Promise<unknown> {
    return this.request("GET", "/v1/team/roles");
  }

  async createTodo(todo: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/v1/timeline/todo/create", todo);
  }

  async logCommunication(payload: Record<string, unknown>): Promise<unknown> {
    return this.request("POST", "/v1/timeline/communication/create", payload);
  }
}
