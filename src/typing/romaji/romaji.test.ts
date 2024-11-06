import { describe, expect, test } from "vitest";
import { Other } from "../japaneseSounds/other";
import { Romaji } from "./romaji";

describe("romaji.test.ts", () => {
  describe("OtherからRomajiへの変換", () => {
    test.each([
      ["あ", { main: "a" }],
      [
        "し",
        {
          main: "si",
          sub: ["shi", "ci"],
        },
      ],
      [
        "ん",
        {
          main: "nn",
          sub: ["xn"],
        },
      ],
      [
        "じ",
        {
          main: "zi",
          sub: ["ji"],
        },
      ],
      [
        "ぱ",
        {
          main: "pa",
        },
      ],
    ])("%s. OtherからRomajiに変換できる", (hiragana, pattern) => {
      const other = new Other(hiragana);
      const romaji = Romaji.fromSoundsOther(other);
      expect(romaji).toBeInstanceOf(Romaji);
      expect(romaji.getRomajiPattern()).toEqual(pattern);
    });
    test("ローマ字のパターンにない場合、エラーを返却する", () => {
      const other = new Other("t");
      expect(() => Romaji.fromSoundsOther(other)).toThrowError();
    });
  });
});
