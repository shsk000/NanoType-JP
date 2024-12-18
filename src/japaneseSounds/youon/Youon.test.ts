import { describe, expect, test } from "vitest";
import { Youon } from "./Youon";

describe("Youon.test.ts", () => {
  test.each([["あ"], ["きゃあ"], ["きぁ"], ["ゔぅ"]])(
    "fromHiragana: %s. 異常系",
    (hiragana) => {
      expect(() => Youon.fromHiragana(hiragana)).toThrowError();
    }
  );

  test.each([
    ["きゃ"],
    ["きぃ"],
    ["きゅ"],
    ["きぇ"],
    ["きょ"],
    ["しゃ"],
    ["しぃ"],
    ["しゅ"],
    ["しぇ"],
    ["しょ"],
    ["ちゃ"],
    ["ちぃ"],
    ["ちゅ"],
    ["ちぇ"],
    ["ちょ"],
    ["てゃ"],
    ["てぃ"],
    ["てゅ"],
    ["てぇ"],
    ["てょ"],
    ["にゃ"],
    ["にぃ"],
    ["にゅ"],
    ["にぇ"],
    ["にょ"],
    ["ひゃ"],
    ["ひぃ"],
    ["ひゅ"],
    ["ひぇ"],
    ["ひょ"],
    ["みゃ"],
    ["みぃ"],
    ["みゅ"],
    ["みぇ"],
    ["みょ"],
    ["りゃ"],
    ["りぃ"],
    ["りゅ"],
    ["りぇ"],
    ["りょ"],
    ["ふゃ"],
    ["ふぃ"],
    ["ふゅ"],
    ["ふぇ"],
    ["ふょ"],
    ["ぎゃ"],
    ["ぎぃ"],
    ["ぎゅ"],
    ["ぎぇ"],
    ["ぎょ"],
    ["じゃ"],
    ["じぃ"],
    ["じゅ"],
    ["じぇ"],
    ["じょ"],
    ["ぢゃ"],
    ["ぢぃ"],
    ["ぢゅ"],
    ["ぢぇ"],
    ["ぢょ"],
    ["びゃ"],
    ["びぃ"],
    ["びゅ"],
    ["びぇ"],
    ["びょ"],
    ["ぴゃ"],
    ["ぴぃ"],
    ["ぴゅ"],
    ["ぴぇ"],
    ["ぴょ"],
    ["でゃ"],
    ["でぃ"],
    ["でゅ"],
    ["でぇ"],
    ["でょ"],
  ])("fromHiragana: %s. 正常系", (hiragana) => {
    const youon = Youon.fromHiragana(hiragana);
    expect(youon).instanceOf(Youon);
    expect((youon as Youon).getHiragana()).toBe(hiragana);
  });

  test.each([
    ["ゔゃ"],
    ["ゔゅ"],
    ["ゔょ"],
    ["ゔぁ"],
    ["ゔぃ"],
    ["ゔぇ"],
    ["ゔぉ"],
  ])("fromHiragana: %s. 「ゔ」の拗音、正常系", (hiragana) => {
    const youon = Youon.fromHiragana(hiragana);
    expect(youon).instanceOf(Youon);
    expect((youon as Youon).getHiragana()).toBe(hiragana);
  });

  test.each([["ゃ"], ["ゅ"], ["ょ"], ["ぁ"], ["ぃ"], ["ぅ"], ["ぇ"], ["ぉ"]])(
    "isSutegana: %s. 捨て仮名判定、正常系",
    (hiragana) => {
      const isSutegana = Youon.isSutegana(hiragana);
      expect(isSutegana).toBeTruthy();
    }
  );

  test.each([["っ"]])("isSutegana: %s. 捨て仮名判定、異常系", (hiragana) => {
    const isSutegana = Youon.isSutegana(hiragana);
    expect(isSutegana).toBeFalsy();
  });

  test("constructor: フォーマットを満たしていない場合はErrorをThrowする", () => {
    expect(() => new Youon("あ  ")).toThrowError();
  });
});
