import { describe, expect, test } from "vitest";
import { RomajiPattern, RomajiPatternUnit } from "./romajiPattern";
import { getConvertUnit } from "./getConvertUnit";
import { Other } from "../japaneseSounds/other";
import { Sokuon } from "../japaneseSounds/sokuon";

describe("romajiPattern.test.ts", () => {
  describe("createSimultaneouslySokuonInputPattern", () => {
    test("mainのみ: 先頭二回入力のパターンデータが作成されている", () => {
      const pattern = getConvertUnit(new Other("た"));
      const sokuonPattern =
        RomajiPattern.createSimultaneouslySokuonInputPattern(pattern);
      expect(sokuonPattern.getMain().getAlphabet()).toBe("tta");
      expect(sokuonPattern.getSub()).toStrictEqual([]);
    });

    test("subあり: 先頭二回入力のパターンデータが作成されている", () => {
      const pattern = getConvertUnit(new Other("か"));
      const sokuonPattern =
        RomajiPattern.createSimultaneouslySokuonInputPattern(pattern);
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
      const pattern = RomajiPattern.concatFieldCombinations(a, b);

      expect(pattern).toStrictEqual(
        new RomajiPattern(new RomajiPatternUnit("ltuka"), [
          new RomajiPatternUnit("ltuca"),
          new RomajiPatternUnit("xtuka"),
          new RomajiPatternUnit("xtuca"),
        ])
      );
    });
    test("促音かつsubなし: 全パターンが網羅できていること", () => {
      const a = getConvertUnit(Sokuon.fromHiragana("っ") as Sokuon);
      const b = getConvertUnit(Other.fromHiragana("さ") as Other);
      const pattern = RomajiPattern.concatFieldCombinations(a, b);

      expect(pattern).toStrictEqual(
        new RomajiPattern(new RomajiPatternUnit("ltusa"), [
          new RomajiPatternUnit("xtusa"),
        ])
      );
    });
  });

  describe("concat", () => {
    test("促音かつsubなし: 全パターンが網羅できていること", () => {
      const a = getConvertUnit(Sokuon.fromHiragana("っ") as Sokuon);
      const b = getConvertUnit(Other.fromHiragana("た") as Other);
      const pattern1 = RomajiPattern.createSimultaneouslySokuonInputPattern(b);
      const pattern2 = RomajiPattern.concatFieldCombinations(a, b);

      const concatPattern = RomajiPattern.concat(pattern1, pattern2);

      expect(concatPattern).toStrictEqual(
        new RomajiPattern(new RomajiPatternUnit("tta"), [
          new RomajiPatternUnit("ltuta"),
          new RomajiPatternUnit("xtuta"),
        ])
      );
    });
  });
});
