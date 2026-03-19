import { describe, it, expect } from "vitest";
import { chunk, unique, groupBy, flatten, shuffle } from "../src/arrays";

describe("chunk", () => {
  it("splits array into chunks of given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("handles exact division", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("handles empty array", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("throws on non-positive size", () => {
    expect(() => chunk([1, 2], 0)).toThrow("Chunk size must be positive");
  });
});

describe("unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it("preserves order", () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
  });

  it("handles empty array", () => {
    expect(unique([])).toEqual([]);
  });

  it("works with strings", () => {
    expect(unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
  });
});

describe("groupBy", () => {
  it("groups by key function", () => {
    const result = groupBy([1, 2, 3, 4, 5], (n) =>
      n % 2 === 0 ? "even" : "odd",
    );
    expect(result).toEqual({
      odd: [1, 3, 5],
      even: [2, 4],
    });
  });

  it("groups objects by property", () => {
    const items = [
      { name: "apple", type: "fruit" },
      { name: "carrot", type: "vegetable" },
      { name: "banana", type: "fruit" },
    ];
    const result = groupBy(items, (item) => item.type);
    expect(result.fruit).toHaveLength(2);
    expect(result.vegetable).toHaveLength(1);
  });

  it("handles empty array", () => {
    expect(groupBy([], () => "key")).toEqual({});
  });
});

describe("flatten", () => {
  it("flattens one level by default", () => {
    expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it("flattens to specified depth", () => {
    expect(flatten([[[1]], [[2]], [[3]]], 2)).toEqual([1, 2, 3]);
  });

  it("handles empty array", () => {
    expect(flatten([])).toEqual([]);
  });

  it("does not flatten beyond specified depth", () => {
    expect(flatten([[[1, 2]], [[3, 4]]], 1)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});

describe("shuffle", () => {
  it("returns array of same length", () => {
    expect(shuffle([1, 2, 3, 4, 5])).toHaveLength(5);
  });

  it("contains same elements", () => {
    expect(shuffle([1, 2, 3]).sort()).toEqual([1, 2, 3]);
  });

  it("does not mutate input", () => {
    const original = [1, 2, 3, 4, 5];
    const originalCopy = [...original];
    shuffle(original);
    expect(original).toEqual(originalCopy);
  });

  it("handles empty array", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("handles single element", () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it("produces different orderings", () => {
    const results: string[] = [];
    for (let i = 0; i < 10; i++) {
      results.push(JSON.stringify(shuffle([1, 2, 3, 4, 5])));
    }
    expect(new Set(results).size).toBeGreaterThan(1);
  });
});
