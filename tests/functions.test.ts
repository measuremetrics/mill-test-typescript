import { describe, it, expect } from "vitest";
import { pipe } from "../src/functions";
import { slugify, clamp, roundTo } from "../src/index";

describe("pipe", () => {
  it("returns initial value with zero transform functions", () => {
    expect(pipe(5)).toBe(5);
  });

  it("returns initial string with zero transform functions", () => {
    expect(pipe("hello")).toBe("hello");
  });

  it("applies a single function transform", () => {
    expect(pipe("hello", (s) => s.toUpperCase())).toBe("HELLO");
  });

  it("chains multiple functions left-to-right", () => {
    expect(
      pipe(
        "  Hello World  ",
        (s) => s.trim(),
        (s) => s.toLowerCase(),
      ),
    ).toBe("hello world");
  });

  it("handles type changes mid-chain (string → number → string)", () => {
    expect(pipe("hello", (s) => s.length, (n) => n * 2)).toBe(10);
  });

  it("works with library slugify function", () => {
    expect(pipe("Hello World", slugify)).toBe("hello-world");
  });

  it("works with cross-category composition (roundTo + clamp)", () => {
    expect(pipe(5.678, (n) => roundTo(n, 1), (n) => clamp(n, 0, 5))).toBe(5);
  });

  it("handles empty string", () => {
    expect(pipe("", (s) => s.toUpperCase())).toBe("");
  });

  it("handles zero", () => {
    expect(pipe(0, (n) => n + 1, (n) => n * 2)).toBe(2);
  });

  it("chains 3+ functions correctly", () => {
    expect(
      pipe(
        "  Some Long Title Here  ",
        (s) => s.trim(),
        slugify,
        (s) => s.toUpperCase(),
      ),
    ).toBe("SOME-LONG-TITLE-HERE");
  });
});
