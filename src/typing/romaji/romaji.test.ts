import { describe, expect, test } from "vitest";
import { Other } from "../japaneseSounds/other";
import { Romaji } from "./romaji";
import { Youon } from "../japaneseSounds/youon";
import { Sokuon } from "../japaneseSounds/sokuon";

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
      [
        "ぃ",
        {
          main: "li",
          sub: ["xi"],
        },
      ],
    ])("%s. OtherからRomajiに変換できる", (hiragana, pattern) => {
      const other = new Other(hiragana);
      const romaji = new Romaji(other);
      expect(romaji).toBeInstanceOf(Romaji);
      expect(romaji.getRomajiPattern()).toEqual(pattern);
    });
    test("ローマ字のパターンにない場合、エラーを返却する", () => {
      const other = new Other("t");
      expect(() => new Romaji(other)).toThrowError();
    });
  });

  describe("YouonからRomajiへの変換", () => {
    test.each([
      ["きゃ", { main: "kya", sub: ["kilya", "kixya"] }],
      ["しぃ", { main: "syi", sub: ["shi", "shili", "shixi"] }],
      ["ちゅ", { main: "tyu", sub: ["chu", "chilyu", "chixyu"] }],
      ["てぇ", { main: "the", sub: ["tele", "texe"] }],
      ["にょ", { main: "nyo", sub: ["nilyo", "nixyo"] }],
      ["ぎゃ", { main: "gya", sub: ["gilya", "gixya"] }],
      ["じぃ", { main: "zyi", sub: ["ji", "jili", "jixi"] }],
      ["ぢゅ", { main: "dyu", sub: ["dilyu", "dixyu"] }],
      ["ぢぇ", { main: "dye", sub: ["dile", "dixe"] }],
      ["ぢょ", { main: "dyo", sub: ["dilyo", "dixyo"] }],
      ["びぇ", { main: "bye", sub: ["bile", "bixe"] }],
      ["ぴょ", { main: "pyo", sub: ["pilyo", "pixyo"] }],
    ])("%s. YouonからRomajiに変換できる", (hiragana, expected) => {
      const romaji = new Romaji(Youon.fromHiragana(hiragana) as Youon);

      expect(romaji.getRomajiPattern()).toStrictEqual(expected);
    });
  });

  describe("Sokuon+OtherからRomajiへの変換", () => {
    test.each([["っ", "た"]])(
      "%s. Sokuon+OtherからRomajiへ変換できる",
      (sokuonHiragana, otherHiragana) => {
        const sokuon = Sokuon.fromHiragana(sokuonHiragana) as Sokuon;
        const other = Other.fromHiragana(otherHiragana) as Other;

        const romaji = new Romaji([sokuon, other]);
        console.log(romaji);
      }
    );
  });
});
