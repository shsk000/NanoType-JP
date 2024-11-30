import { describe, expect, test } from "vitest";
import { TypingPattern, TypingPatternUnit, getConvertUnit } from ".";
import { Other, Sokuon } from "../japaneseSounds";

describe("typingPattern.test.ts", () => {
  describe("createSimultaneouslySokuonInputPattern", () => {
    test("mainのみ: 先頭二回入力のパターンデータが作成されている", () => {
      const pattern = getConvertUnit(new Other("た"));
      const sokuonPattern =
        TypingPattern.createSimultaneouslySokuonInputPattern(pattern);
      expect(sokuonPattern.getMain().getAlphabet()).toBe("tta");
      expect(sokuonPattern.getSub()).toStrictEqual([]);
    });

    test("subあり: 先頭二回入力のパターンデータが作成されている", () => {
      const pattern = getConvertUnit(new Other("か"));
      const sokuonPattern =
        TypingPattern.createSimultaneouslySokuonInputPattern(pattern);
      expect(sokuonPattern.getMain().getAlphabet()).toBe("kka");
      const sub = sokuonPattern.getSub();
      expect(sub).toHaveLength(1);
      expect(sub[0].getAlphabet()).toBe("cca");
    });
  });

  describe("concatFieldCombinations", () => {
    test("促音かつsubあり: 全パターンが網羅できていること", () => {
      const a = getConvertUnit(Sokuon.fromHiragana("っ") as Sokuon);
      const b = getConvertUnit(Other.fromHiragana("か") as Other);
      const pattern = TypingPattern.concatFieldCombinations(a, b);

      expect(pattern).toStrictEqual(
        new TypingPattern(new TypingPatternUnit("ltuka"), [
          new TypingPatternUnit("ltuca"),
          new TypingPatternUnit("xtuka"),
          new TypingPatternUnit("xtuca"),
        ])
      );
    });
    test("促音かつsubなし: 全パターンが網羅できていること", () => {
      const a = getConvertUnit(Sokuon.fromHiragana("っ") as Sokuon);
      const b = getConvertUnit(Other.fromHiragana("さ") as Other);
      const pattern = TypingPattern.concatFieldCombinations(a, b);

      expect(pattern).toStrictEqual(
        new TypingPattern(new TypingPatternUnit("ltusa"), [
          new TypingPatternUnit("xtusa"),
        ])
      );
    });
  });

  describe("concat", () => {
    test("促音かつsubなし: 全パターンが網羅できていること", () => {
      const a = getConvertUnit(Sokuon.fromHiragana("っ") as Sokuon);
      const b = getConvertUnit(Other.fromHiragana("た") as Other);
      const pattern1 = TypingPattern.createSimultaneouslySokuonInputPattern(b);
      const pattern2 = TypingPattern.concatFieldCombinations(a, b);

      const concatPattern = TypingPattern.concat(pattern1, pattern2);

      expect(concatPattern).toStrictEqual(
        new TypingPattern(new TypingPatternUnit("tta"), [
          new TypingPatternUnit("ltuta"),
          new TypingPatternUnit("xtuta"),
        ])
      );
    });
  });
});
