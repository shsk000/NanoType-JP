import { describe, expect, test } from "vitest";
import { soundsOrSymbolsParser } from ".";
import { Sokuon } from "../japaneseSounds/sokuon";
import { Other } from "../japaneseSounds/other";
import { Youon } from "../japaneseSounds/youon";
import { Symbols } from "../symbols/Symbols";

describe("soundsOrSymbolsParser.test.ts", () => {
  describe("促音、Otherの判定", () => {
    test("っ. 正常系 促音", () => {
      const result = soundsOrSymbolsParser("っ");
      expect(result[0]).instanceOf(Sokuon);
      expect(result[0].getHiragana()).toBe("っ");
    });

    test.each(["あ", "び", "ぴ", "ぁ", "ゃ"])(
      "%s. 清音,濁音,半濁音 正常系",
      (hiragana) => {
        const result = soundsOrSymbolsParser(hiragana);
        expect(result[0]).instanceOf(Other);
        expect(result[0].getHiragana()).toBe(hiragana);
      }
    );
  });

  describe("拗音の判定", () => {
    test("びゃあ. 拗音 正常系", () => {
      const result = soundsOrSymbolsParser("びゃあ");
      expect(result[0]).instanceOf(Youon);
      expect(result[0].getHiragana()).toBe("びゃ");

      expect(result[1]).instanceOf(Other);
      expect(result[1].getHiragana()).toBe("あ");
    });

    test("あぁ. 拗音 異常系", () => {
      const result = soundsOrSymbolsParser("あぁ");
      expect(result[0]).instanceOf(Other);
      expect(result[0].getHiragana()).toBe("あ");
      expect(result[1]).instanceOf(Other);
      expect(result[1].getHiragana()).toBe("ぁ");
    });
  });

  describe("記号の判定", () => {
    test("！. 記号 正常系", () => {
      const result = soundsOrSymbolsParser("！");
      expect(result[0]).instanceOf(Symbols);
      expect(result[0].getHiragana()).toBe("！");
    });
  });

  describe("複合", () => {
    test("ぱっきゃお", () => {
      const result = soundsOrSymbolsParser("ぱっきゃお");
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
      const result = soundsOrSymbolsParser("ゔぁゔぃゔゔぁぁ");
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

    test("あ！「ゔぁ￥", () => {
      const result = soundsOrSymbolsParser("あ！「ゔぁ￥");
      expect(result[0]).instanceOf(Other);
      expect(result[0].getHiragana()).toBe("あ");
      expect(result[1]).instanceOf(Symbols);
      expect(result[1].getHiragana()).toBe("！");
      expect(result[2]).instanceOf(Symbols);
      expect(result[2].getHiragana()).toBe("「");
      expect(result[3]).instanceOf(Youon);
      expect(result[3].getHiragana()).toBe("ゔぁ");
      expect(result[4]).instanceOf(Symbols);
      expect(result[4].getHiragana()).toBe("￥");
    });
  });
});
