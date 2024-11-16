import { describe, expect, test } from "vitest";
import { parseHiragana } from "../parseHiragana/parse";
import { AlphabetInputPattern } from "./alphabetInputPattern";

describe("alphabetInputPattern.test.ts", () => {
  test.each([
    ["かきくけこ", ["kakikukeko", "kakikukeco", "cakikukeko", "cakikukeco"]],
    [
      "ぱっきゃお",
      [
        "pakkyao",
        "paltukyao",
        "paltukilyao",
        "paltukixyao",
        "paxtukyao",
        "paxtukilyao",
        "paxtukixyao",
      ],
    ],
  ])("%s. 組み合わせパターンを生成している", (hiraganaSentence, expected) => {
    const romajiArr = parseHiragana(hiraganaSentence);
    const pattern = new AlphabetInputPattern(romajiArr);

    expect(pattern.getAllPatern()).toStrictEqual(expected);
  });
});
