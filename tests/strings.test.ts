import { describe, it, expect } from "vitest";
import { capitalize, slugify, truncate, kebabCase, isPalindrome, hello } from "../src/strings";

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

describe("isPalindrome", () => {
  it("detects simple palindrome", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });

  it("handles mixed case with punctuation and spaces", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  it("detects non-palindrome", () => {
    expect(isPalindrome("hello")).toBe(false);
  });

  it("handles empty string", () => {
    expect(isPalindrome("")).toBe(true);
  });

  it("handles single character", () => {
    expect(isPalindrome("a")).toBe(true);
  });

  it("detects sentence palindrome with punctuation", () => {
    expect(isPalindrome("Was it a car or a cat I saw?")).toBe(true);
  });

  it("handles apostrophes and mixed case", () => {
    expect(isPalindrome("No 'x' in Nixon")).toBe(true);
  });

  it("detects two different characters", () => {
    expect(isPalindrome("ab")).toBe(false);
  });
});

describe("hello", () => {
  it("returns hello world", () => {
    expect(hello()).toBe("hello world");
  });
});
