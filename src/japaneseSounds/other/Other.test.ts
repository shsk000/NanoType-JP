import { describe, expect, test } from "vitest";
import { Other } from "./Other";

describe("Other.test.ts", () => {
  test.each(["っ", "きゃ", "しゃ", "ちょ", "ゔぁ", "ぴょ"])(
    "fromHiragana: %s. 拗音、促音はErrorをThrowする",
    (hiragana) => {
      expect(() => Other.fromHiragana(hiragana)).toThrowError();
    }
  );

  test.each(["あ", "ん", "び", "ぴ", "ぁ"])(
    "fromHiragana: %s. 拗音、促音以外はOtherクラスを返却する",
    (hiragana) => {
      expect(Other.fromHiragana(hiragana)).instanceOf(Other);
    }
  );

  test("constructor: フォーマットを満たしていない場合はErrorをThrowする", () => {
    expect(() => new Other("っ")).toThrowError();
  });
});
