import { describe, expect, it } from "vitest";
import { removeHeaders, splitEntries } from "./update-oxford-data";

describe("update-oxford-data parser", () => {
  it("removes Oxford headers and groups entries by level", () => {
    const lines = [
      "© Oxford University Press",
      "The Oxford 3000",
      "1 / 2",
      "A1",
      "book n.",
      "look after phrasal v.",
      "A2",
      "give up phrasal v.",
      "fine adj.",
      "The Oxford 5000",
    ];

    const entries = splitEntries(removeHeaders(lines));

    expect(entries).toEqual({
      A1: [
        { word: "book", pos: "n.", raw: "book n." },
        { word: "look after", pos: "phrasal v.", raw: "look after phrasal v." },
      ],
      A2: [
        { word: "give up", pos: "phrasal v.", raw: "give up phrasal v." },
        { word: "fine", pos: "adj.", raw: "fine adj." },
      ],
      B1: [],
      B2: [],
      C1: [],
    });
  });
});
