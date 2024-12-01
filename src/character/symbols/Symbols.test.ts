import { describe, expect, test } from "vitest";
import { Symbols } from "./Symbols";

describe("Symbols", () => {
  const testCases = [
    { input: "！", expected: "!" },
    { input: "”", expected: '"' },
    { input: "＃", expected: "#" },
    { input: "＄", expected: "$" },
    { input: "％", expected: "%" },
    { input: "＆", expected: "&" },
    { input: "’", expected: "'" },
    { input: "（", expected: "(" },
    { input: "）", expected: ")" },
    { input: "＝", expected: "=" },
    { input: "～", expected: "~" },
    { input: "｜", expected: "|" },
    { input: "｛", expected: "{" },
    { input: "｝", expected: "}" },
    { input: "＊", expected: "*" },
    { input: "＋", expected: "+" },
    { input: "＿", expected: "_" },
    { input: "？", expected: "?" },
    { input: "＜", expected: "<" },
    { input: "＞", expected: ">" },
    { input: "、", expected: "," },
    { input: "。", expected: "." },
    { input: "￥", expected: "\\" },
    { input: "；", expected: ";" },
    { input: "：", expected: ":" },
    { input: "」", expected: "]" },
    { input: "ー", expected: "-" },
    { input: "「", expected: "[" },
    { input: "＠", expected: "@" },
    { input: "＾", expected: "^" },
    { input: "－", expected: "-" },
    { input: "　", expected: " " },
  ];

  test.each(testCases)("$input is Symbols", ({ input }) => {
    expect(Symbols.isSymbols(input)).toBeTruthy();
  });

  test.each(testCases)("$input to $expected", ({ input, expected }) => {
    expect(new Symbols(input).getHalfWidth()).toBe(expected);
  });
});
