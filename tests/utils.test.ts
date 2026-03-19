import { describe, it, expect } from "vitest";
import { reverse } from "../src/utils";

describe("reverse", () => {
  it("reverses a simple string", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  it("reverses a string with spaces", () => {
    expect(reverse("hello world")).toBe("dlrow olleh");
  });

  it("handles empty string", () => {
    expect(reverse("")).toBe("");
  });

  it("handles single character", () => {
    expect(reverse("a")).toBe("a");
  });

  it("handles string with special characters", () => {
    expect(reverse("hello!@#")).toBe("#@!olleh");
  });

  it("handles palindrome", () => {
    expect(reverse("racecar")).toBe("racecar");
  });

  it("handles string with numbers", () => {
    expect(reverse("abc123")).toBe("321cba");
  });
});