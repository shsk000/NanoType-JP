import { describe, expect, test } from "vitest";
import { Other, Youon, Sokuon } from "../japaneseSounds";
import { Romaji } from "./";
import {
  RomajiPattern,
  RomajiPatternUnit,
} from "../romajiPattern/romajiPattern";

describe("romaji.test.ts", () => {
  describe("OtherからRomajiへの変換", () => {
    test.each([
      ["あ", { main: new RomajiPatternUnit("a"), sub: [] }],
      [
        "し",
        {
          main: new RomajiPatternUnit("si"),
          sub: [new RomajiPatternUnit("shi"), new RomajiPatternUnit("ci")],
        },
      ],
      [
        "ん",
        {
          main: new RomajiPatternUnit("nn"),
          sub: [new RomajiPatternUnit("xn")],
        },
      ],
      [
        "じ",
        {
          main: new RomajiPatternUnit("zi"),
          sub: [new RomajiPatternUnit("ji")],
        },
      ],
      [
        "ぱ",
        {
          main: new RomajiPatternUnit("pa"),
          sub: [],
        },
      ],
      [
        "ぃ",
        {
          main: new RomajiPatternUnit("li"),
          sub: [new RomajiPatternUnit("xi")],
        },
      ],
    ])("%s. OtherからRomajiに変換できる", (hiragana, pattern) => {
      const other = new Other(hiragana);
      const romaji = new Romaji(other);
      expect(romaji).toBeInstanceOf(Romaji);
      expect(romaji.getRomajiPattern().getMain()).toStrictEqual(pattern.main);
      expect(romaji.getRomajiPattern().getSub()).toStrictEqual(pattern.sub);
    });
    test("ローマ字のパターンにない場合、エラーを返却する", () => {
      const other = new Other("t");
      expect(() => new Romaji(other)).toThrowError();
    });
  });

  describe("YouonからRomajiへの変換", () => {
    test.each([
      [
        "きゃ",
        {
          main: new RomajiPatternUnit("kya"),
          sub: [new RomajiPatternUnit("kilya"), new RomajiPatternUnit("kixya")],
        },
      ],
      [
        "しぃ",
        {
          main: new RomajiPatternUnit("syi"),
          sub: [
            new RomajiPatternUnit("shi"),
            new RomajiPatternUnit("shili"),
            new RomajiPatternUnit("shixi"),
          ],
        },
      ],
      [
        "ちゅ",
        {
          main: new RomajiPatternUnit("tyu"),
          sub: [
            new RomajiPatternUnit("chu"),
            new RomajiPatternUnit("chilyu"),
            new RomajiPatternUnit("chixyu"),
          ],
        },
      ],
      [
        "てぇ",
        {
          main: new RomajiPatternUnit("the"),
          sub: [new RomajiPatternUnit("tele"), new RomajiPatternUnit("texe")],
        },
      ],
      [
        "にょ",
        {
          main: new RomajiPatternUnit("nyo"),
          sub: [new RomajiPatternUnit("nilyo"), new RomajiPatternUnit("nixyo")],
        },
      ],
      [
        "ぎゃ",
        {
          main: new RomajiPatternUnit("gya"),
          sub: [new RomajiPatternUnit("gilya"), new RomajiPatternUnit("gixya")],
        },
      ],
      [
        "じぃ",
        {
          main: new RomajiPatternUnit("zyi"),
          sub: [
            new RomajiPatternUnit("ji"),
            new RomajiPatternUnit("jili"),
            new RomajiPatternUnit("jixi"),
          ],
        },
      ],
      [
        "ぢゅ",
        {
          main: new RomajiPatternUnit("dyu"),
          sub: [new RomajiPatternUnit("dilyu"), new RomajiPatternUnit("dixyu")],
        },
      ],
      [
        "ぢぇ",
        {
          main: new RomajiPatternUnit("dye"),
          sub: [new RomajiPatternUnit("dile"), new RomajiPatternUnit("dixe")],
        },
      ],
      [
        "ぢょ",
        {
          main: new RomajiPatternUnit("dyo"),
          sub: [new RomajiPatternUnit("dilyo"), new RomajiPatternUnit("dixyo")],
        },
      ],
      [
        "びぇ",
        {
          main: new RomajiPatternUnit("bye"),
          sub: [new RomajiPatternUnit("bile"), new RomajiPatternUnit("bixe")],
        },
      ],
      [
        "ぴょ",
        {
          main: new RomajiPatternUnit("pyo"),
          sub: [new RomajiPatternUnit("pilyo"), new RomajiPatternUnit("pixyo")],
        },
      ],
    ])("%s. YouonからRomajiに変換できる", (hiragana, pattern) => {
      const youon = new Youon(hiragana);
      const romaji = new Romaji(youon);
      expect(romaji).toBeInstanceOf(Romaji);
      expect(romaji.getRomajiPattern().getMain()).toStrictEqual(pattern.main);
      expect(romaji.getRomajiPattern().getSub()).toStrictEqual(pattern.sub);
    });
  });

  describe("Sokuon+OtherからRomajiへの変換", () => {
    test.each([
      [
        ["っ", "た"],
        new RomajiPattern(new RomajiPatternUnit("tta"), [
          new RomajiPatternUnit("ltuta"),
          new RomajiPatternUnit("xtuta"),
        ]),
      ],
      [
        ["っ", "か"],
        new RomajiPattern(new RomajiPatternUnit("kka"), [
          new RomajiPatternUnit("cca"),
          new RomajiPatternUnit("ltuka"),
          new RomajiPatternUnit("ltuca"),
          new RomajiPatternUnit("xtuka"),
          new RomajiPatternUnit("xtuca"),
        ]),
      ],
      [
        ["っ", "か"],
        new RomajiPattern(new RomajiPatternUnit("kka"), [
          new RomajiPatternUnit("cca"),
          new RomajiPatternUnit("ltuka"),
          new RomajiPatternUnit("ltuca"),
          new RomajiPatternUnit("xtuka"),
          new RomajiPatternUnit("xtuca"),
        ]),
      ],
      [
        ["っ", "つ"],
        new RomajiPattern(new RomajiPatternUnit("ttu"), [
          new RomajiPatternUnit("ttsu"),
          new RomajiPatternUnit("ltutu"),
          new RomajiPatternUnit("ltutsu"),
          new RomajiPatternUnit("xtutu"),
          new RomajiPatternUnit("xtutsu"),
        ]),
      ],
    ])(
      "%s. Sokuon+OtherからRomajiへ変換できる",
      ([sokuonHiragana, otherHiragana], expected) => {
        const sokuon = Sokuon.fromHiragana(sokuonHiragana) as Sokuon;
        const other = Other.fromHiragana(otherHiragana) as Other;

        const romaji = new Romaji([sokuon, other]);
        expect(romaji.getRomajiPattern()).toStrictEqual(expected);
      }
    );
  });

  describe("Sokuon+YouonからRomajiへの変換", () => {
    test.each([
      [
        ["っ", "きゃ"],
        new RomajiPattern(new RomajiPatternUnit("kkya"), [
          new RomajiPatternUnit("ltukya"),
          new RomajiPatternUnit("ltukilya"),
          new RomajiPatternUnit("ltukixya"),
          new RomajiPatternUnit("xtukya"),
          new RomajiPatternUnit("xtukilya"),
          new RomajiPatternUnit("xtukixya"),
        ]),
      ],
      [
        ["っ", "じゃ"],
        new RomajiPattern(new RomajiPatternUnit("zzya"), [
          new RomajiPatternUnit("jja"),
          new RomajiPatternUnit("ltuzya"),
          new RomajiPatternUnit("ltuja"),
          new RomajiPatternUnit("ltujilya"),
          new RomajiPatternUnit("ltujixya"),
          new RomajiPatternUnit("xtuzya"),
          new RomajiPatternUnit("xtuja"),
          new RomajiPatternUnit("xtujilya"),
          new RomajiPatternUnit("xtujixya"),
        ]),
      ],
    ])(
      "%s. Sokuon+YouonからRomajiへ変換できる",
      ([sokuonHiragana, youonHiragana], expected) => {
        const sokuon = Sokuon.fromHiragana(sokuonHiragana) as Sokuon;
        const youon = Youon.fromHiragana(youonHiragana) as Youon;

        const romaji = new Romaji([sokuon, youon]);
        expect(romaji.getRomajiPattern()).toStrictEqual(expected);
      }
    );
  });
});
