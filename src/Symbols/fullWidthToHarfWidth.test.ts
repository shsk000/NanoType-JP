import { describe, expect, test } from "vitest";
import { fullWidthToHalfWidth } from "./fullWidthToHarfWidth";

describe("fullWidthToHarfWidth", () => {
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

  test.each(testCases)(
    `converts $input to $expected`,
    ({ input, expected }) => {
      console.log(input, expected);
      expect(fullWidthToHalfWidth(input)).toBe(expected);
    }
  );

  test("converts multiple characters in a sentence", () => {
    const input = '全角文字："＠＃＄％＆"';
    const expected = '全角文字:"@#$%&"';
    expect(fullWidthToHalfWidth(input)).toBe(expected);
  });
});
