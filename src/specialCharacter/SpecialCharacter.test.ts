import { describe, expect, test } from "vitest";
import { SpecialCharacter } from "./SpecialCharacter";

describe("SpecialCharacter", () => {
  const testCases = [
    { input: "!" },
    { input: '"' },
    { input: "#" },
    { input: "$" },
    { input: "%" },
    { input: "&" },
    { input: "'" },
    { input: "(" },
    { input: ")" },
    { input: "=" },
    { input: "~" },
    { input: "|" },
    { input: "{" },
    { input: "}" },
    { input: "'" },
    { input: "*" },
    { input: "+" },
    { input: "_" },
    { input: "?" },
    { input: "<" },
    { input: ">" },
    { input: "," },
    { input: "." },
    { input: "\\" },
    { input: ";" },
    { input: ":" },
    { input: "]" },
    { input: "-" },
    { input: "[" },
    { input: "@" },
    { input: "^" },
    { input: "-" },
  ];
  test.each(testCases)("$input is SpecialCharacter", ({ input }) => {
    expect(SpecialCharacter.isSpecialCharacter(input)).toBeTruthy();
  });
});
