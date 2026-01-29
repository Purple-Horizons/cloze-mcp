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

    if (data.errorcode) {
      throw new Error(`Cloze API error: ${data.errorcode} - ${data.message}`);
    }

    return data as T;
  }

  // ==================== People ====================

  async findPeople(query: string, limit = 10): Promise<unknown> {
    return this.request("POST", "/v1/people/find", {
      query,
      limit,
    });
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
    return this.request("POST", "/v1/companies/find", {
      query,
      limit,
    });
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
    return this.request("POST", "/v1/projects/find", {
      query,
      limit,
    });
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
}
