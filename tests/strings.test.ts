import { describe, it, expect } from "vitest";
import { capitalize, slugify, truncate, kebabCase } from "../src/strings";

describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });

  it("handles already capitalized string", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("only capitalizes the first letter", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });
});

describe("slugify", () => {
  it("converts spaces to hyphens", () => {
    expect(slugify("hello world")).toBe("hello-world");
  });

  it("lowercases the string", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("hello! @world#")).toBe("hello-world");
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });
});

describe("truncate", () => {
  it("returns string unchanged if within limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates with default suffix", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("truncates with custom suffix", () => {
    expect(truncate("hello world", 8, "~")).toBe("hello w~");
  });

  it("handles exact length", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });
});

describe("kebabCase", () => {
  it("converts camelCase", () => {
    expect(kebabCase("helloWorld")).toBe("hello-world");
  });

  it("converts PascalCase", () => {
    expect(kebabCase("HelloWorld")).toBe("hello-world");
  });

  it("converts spaces", () => {
    expect(kebabCase("hello world")).toBe("hello-world");
  });

  it("handles consecutive uppercase letters", () => {
    expect(kebabCase("parseHTMLString")).toBe("parse-html-string");
  });
});
