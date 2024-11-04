import { describe, expect, test } from "vitest";
import { japaneseSoundsParser } from "./japaneseSoundsParser";
import { Sokuon } from "../sokuon";
import { Other } from "../other";
import { Youon } from "../youon";

describe("japaneseSoundsParser.test.ts", () => {
  describe("１入力", () => {
    test("っ. 正常系 促音", () => {
      const result = japaneseSoundsParser("っ");
      expect(result[0]).instanceOf(Sokuon);
      expect(result[0].getHiragana()).toBe("っ");
    });

    test.each(["あ", "び", "ぴ", "ぁ", "ゃ"])(
      "%s. 清音,濁音,半濁音 正常系",
      (hiragana) => {
        const result = japaneseSoundsParser(hiragana);
        expect(result[0]).instanceOf(Other);
        expect(result[0].getHiragana()).toBe(hiragana);
      }
    );

    test("拗音 正常系", () => {
      const result = japaneseSoundsParser("びゃあ");
      expect(result[0]).instanceOf(Youon);
      expect(result[0].getHiragana()).toBe("びゃ");

      expect(result[1]).instanceOf(Other);
      expect(result[1].getHiragana()).toBe("あ");
    });
  });
});
