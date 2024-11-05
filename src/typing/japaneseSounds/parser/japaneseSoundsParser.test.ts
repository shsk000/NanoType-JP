import { describe, expect, test } from "vitest";
import { japaneseSoundsParser } from "./japaneseSoundsParser";
import { Sokuon } from "../sokuon";
import { Other } from "../other";
import { Youon } from "../youon";

describe("japaneseSoundsParser.test.ts", () => {
  describe("促音、Otherの判定", () => {
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
  });

  describe("拗音の判定", () => {
    test("びゃあ. 拗音 正常系", () => {
      const result = japaneseSoundsParser("びゃあ");
      expect(result[0]).instanceOf(Youon);
      expect(result[0].getHiragana()).toBe("びゃ");

      expect(result[1]).instanceOf(Other);
      expect(result[1].getHiragana()).toBe("あ");
    });

    test("あぁ. 拗音 異常系", () => {
      const result = japaneseSoundsParser("あぁ");
      expect(result[0]).instanceOf(Other);
      expect(result[0].getHiragana()).toBe("あ");
      expect(result[1]).instanceOf(Other);
      expect(result[1].getHiragana()).toBe("ぁ");
    });
  });

  describe("複合", () => {
    test("ぱっきゃお", () => {
      const result = japaneseSoundsParser("ぱっきゃお");
      expect(result[0]).instanceOf(Other);
      expect(result[0].getHiragana()).toBe("ぱ");
      expect(result[1]).instanceOf(Sokuon);
      expect(result[1].getHiragana()).toBe("っ");
      expect(result[2]).instanceOf(Youon);
      expect(result[2].getHiragana()).toBe("きゃ");
      expect(result[3]).instanceOf(Other);
      expect(result[3].getHiragana()).toBe("お");
    });

    test("ゔぁゔぃゔゔぁぁ", () => {
      const result = japaneseSoundsParser("ゔぁゔぃゔゔぁぁ");
      expect(result[0]).instanceOf(Youon);
      expect(result[0].getHiragana()).toBe("ゔぁ");
      expect(result[1]).instanceOf(Youon);
      expect(result[1].getHiragana()).toBe("ゔぃ");
      expect(result[2]).instanceOf(Other);
      expect(result[2].getHiragana()).toBe("ゔ");
      expect(result[3]).instanceOf(Youon);
      expect(result[3].getHiragana()).toBe("ゔぁ");
      expect(result[4]).instanceOf(Other);
      expect(result[4].getHiragana()).toBe("ぁ");
    });
  });
});
