import { describe, it, expect } from "vitest";
import { pipe } from "../src/functions";
import { slugify, clamp, roundTo } from "../src/index";

describe("pipe", () => {
  it("returns initial value with zero transform functions", () => {
    expect(pipe(5)).toBe(5);
  });

  it("applies a single function", () => {
    expect(pipe("hello", (s) => s.toUpperCase())).toBe("HELLO");
  });

  it("chains multiple functions left-to-right", () => {
    expect(pipe("  Hello World  ", (s) => s.trim(), (s) => s.toLowerCase())).toBe("hello world");
  });

  it("handles type changes mid-chain (string → number)", () => {
    expect(pipe("hello", (s) => s.length, (n) => n * 2)).toBe(10);
  });

  it("works with library utility: slugify", () => {
    expect(pipe("Hello World", slugify)).toBe("hello-world");
  });

  it("works with library utilities across categories", () => {
    expect(pipe(5.678, (n) => roundTo(n, 1), (n) => clamp(n, 0, 5))).toBe(5);
  });

  it("handles empty string", () => {
    expect(pipe("", (s) => s.toUpperCase())).toBe("");
  });

  it("handles zero value", () => {
    expect(pipe(0, (n) => n + 1, (n) => n * 3)).toBe(3);
  });

  it("handles three-step string to number to string chain", () => {
    expect(pipe("hello", (s) => s.length, (n) => n * 2, (n) => `length: ${n}`)).toBe("length: 10");
  });
});
