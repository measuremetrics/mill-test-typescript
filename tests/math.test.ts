import { describe, it, expect } from "vitest";
import { clamp, lerp, roundTo } from "../src/math";

describe("clamp", () => {
  it("clamps value below min", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("clamps value above max", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("returns value within range unchanged", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("handles equal min and max", () => {
    expect(clamp(5, 3, 3)).toBe(3);
  });
});

describe("lerp", () => {
  it("returns start at t=0", () => {
    expect(lerp(0, 10, 0)).toBe(0);
  });

  it("returns end at t=1", () => {
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it("returns midpoint at t=0.5", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });

  it("works with negative values", () => {
    expect(lerp(-10, 10, 0.5)).toBe(0);
  });
});

describe("roundTo", () => {
  it("rounds to specified decimals", () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
  });

  it("rounds to zero decimals", () => {
    expect(roundTo(3.7, 0)).toBe(4);
  });

  it("handles already rounded values", () => {
    expect(roundTo(5.0, 2)).toBe(5);
  });

  it("rounds up correctly", () => {
    expect(roundTo(2.555, 2)).toBe(2.56);
  });
});
