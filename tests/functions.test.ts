import { describe, it, expect } from "vitest";
import { pipe } from "../src/functions";
import { slugify } from "../src/strings";
import { clamp, roundTo } from "../src/math";

describe("pipe", () => {
  it("returns initial value with zero transform functions", () => {
    expect(pipe(5)).toBe(5);
    expect(pipe("hello")).toBe("hello");
    expect(pipe([])).toEqual([]);
  });

  it("applies single function transform", () => {
    expect(pipe("hello", (s) => s.toUpperCase())).toBe("HELLO");
    expect(pipe(10, (n) => n * 2)).toBe(20);
  });

  it("chains multiple functions left-to-right", () => {
    const result = pipe(
      "  Hello World  ",
      (s) => s.trim(),
      (s) => s.toLowerCase()
    );
    expect(result).toBe("hello world");
  });

  it("handles type changes mid-chain", () => {
    const result = pipe(
      "hello",
      (s) => s.length,
      (n) => n * 2
    );
    expect(result).toBe(10);
  });

  it("works with existing library functions", () => {
    const result = pipe("Hello World", slugify);
    expect(result).toBe("hello-world");
  });

  it("supports cross-category composition", () => {
    const result = pipe(
      5.678,
      (n) => roundTo(n, 1),
      (n) => clamp(n, 0, 5)
    );
    expect(result).toBe(5);
  });

  it("supports complex multi-step chains", () => {
    const result = pipe(
      "  Some Long Title Here  ",
      (s) => s.trim(),
      (s) => s.substring(0, 10),
      slugify
    );
    expect(result).toBe("some-long");
  });

  it("handles edge cases correctly", () => {
    expect(pipe("", (s) => s.toUpperCase())).toBe("");
    expect(pipe(0, (n) => n + 1)).toBe(1);
    expect(pipe(null, (x) => x)).toBe(null);
  });
});