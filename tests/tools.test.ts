import { describe, expect, it, vi } from "vitest";
import { handleToolCall } from "../src/tools.js";
import type { ClozeClient } from "../src/cloze-client.js";

describe("handleToolCall metadata helpers", () => {
  it("routes cloze_get_custom_fields with relationType", async () => {
    const getCustomFields = vi.fn().mockResolvedValue({ list: [] });
    const client = { getCustomFields } as unknown as ClozeClient;

    const result = await handleToolCall(client, "cloze_get_custom_fields", {
      relationType: "person",
    });

    expect(getCustomFields).toHaveBeenCalledWith("person");
    expect(result).toEqual({ list: [] });
  });

  it("passes filters to cloze_get_steps", async () => {
    const getSteps = vi.fn().mockResolvedValue({ segments: {} });
    const client = { getSteps } as unknown as ClozeClient;

    await handleToolCall(client, "cloze_get_steps", { segment: "buyer", stage: "future" });

    expect(getSteps).toHaveBeenCalledWith({ segment: "buyer", stage: "future" });
  });

  it("fetches team members via cloze_list_team_members", async () => {
    const listTeamMembers = vi.fn().mockResolvedValue({ list: [] });
    const client = { listTeamMembers } as unknown as ClozeClient;

    const result = await handleToolCall(client, "cloze_list_team_members", {});

    expect(listTeamMembers).toHaveBeenCalledOnce();
    expect(result).toEqual({ list: [] });
  });
});

describe("handleToolCall advanced + timeline", () => {
  it("passes args to advanced people search", async () => {
    const findPeopleAdvanced = vi.fn().mockResolvedValue({});
    const client = { findPeopleAdvanced } as unknown as ClozeClient;

    await handleToolCall(client, "cloze_people_find_advanced", {
      query: "stage:current",
      pageSize: 25,
    });

    expect(findPeopleAdvanced).toHaveBeenCalledWith({ query: "stage:current", pageSize: 25 });
  });

  it("validates todo subject", async () => {
    const createTodo = vi.fn();
    const client = { createTodo } as unknown as ClozeClient;

    await expect(() => handleToolCall(client, "cloze_create_todo", {})).rejects.toThrow(
      "'subject' is required"
    );
  });

  it("creates todo when subject provided", async () => {
    const createTodo = vi.fn().mockResolvedValue({ errorcode: 0 });
    const client = { createTodo } as unknown as ClozeClient;

    await handleToolCall(client, "cloze_create_todo", { subject: "Follow up" });

    expect(createTodo).toHaveBeenCalledWith({ subject: "Follow up" });
  });
});
