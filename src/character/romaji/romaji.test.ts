import { describe, expect, test } from "vitest";
import { Other, Youon, Sokuon } from "../../japaneseSounds";
import { Romaji } from ".";
import {
  TypingPattern,
  TypingPatternUnit,
} from "../../typingPattern/typingPattern";

describe("romaji.test.ts", () => {
  describe("OtherからRomajiへの変換", () => {
    test.each([
      ["あ", { main: new TypingPatternUnit("a"), sub: [] }],
      [
        "し",
        {
          main: new TypingPatternUnit("si"),
          sub: [new TypingPatternUnit("shi"), new TypingPatternUnit("ci")],
        },
      ],
      [
        "ん",
        {
          main: new TypingPatternUnit("nn"),
          sub: [new TypingPatternUnit("xn")],
        },
      ],
      [
        "じ",
        {
          main: new TypingPatternUnit("zi"),
          sub: [new TypingPatternUnit("ji")],
        },
      ],
      [
        "ぱ",
        {
          main: new TypingPatternUnit("pa"),
          sub: [],
        },
      ],
      [
        "ぃ",
        {
          main: new TypingPatternUnit("li"),
          sub: [new TypingPatternUnit("xi")],
        },
      ],
    ])("%s. OtherからRomajiに変換できる", (hiragana, pattern) => {
      const other = new Other(hiragana);
      const romaji = new Romaji(other);
      expect(romaji).toBeInstanceOf(Romaji);
      expect(romaji.getTypingPattern().getMain()).toStrictEqual(pattern.main);
      expect(romaji.getTypingPattern().getSub()).toStrictEqual(pattern.sub);
    });
  });

  describe("YouonからRomajiへの変換", () => {
    test.each([
      [
        "きゃ",
        {
          main: new TypingPatternUnit("kya"),
          sub: [new TypingPatternUnit("kilya"), new TypingPatternUnit("kixya")],
        },
      ],
      [
        "しぃ",
        {
          main: new TypingPatternUnit("syi"),
          sub: [
            new TypingPatternUnit("shi"),
            new TypingPatternUnit("shili"),
            new TypingPatternUnit("shixi"),
          ],
        },
      ],
      [
        "ちゅ",
        {
          main: new TypingPatternUnit("tyu"),
          sub: [
            new TypingPatternUnit("chu"),
            new TypingPatternUnit("chilyu"),
            new TypingPatternUnit("chixyu"),
          ],
        },
      ],
      [
        "てぇ",
        {
          main: new TypingPatternUnit("the"),
          sub: [new TypingPatternUnit("tele"), new TypingPatternUnit("texe")],
        },
      ],
      [
        "にょ",
        {
          main: new TypingPatternUnit("nyo"),
          sub: [new TypingPatternUnit("nilyo"), new TypingPatternUnit("nixyo")],
        },
      ],
      [
        "ぎゃ",
        {
          main: new TypingPatternUnit("gya"),
          sub: [new TypingPatternUnit("gilya"), new TypingPatternUnit("gixya")],
        },
      ],
      [
        "じぃ",
        {
          main: new TypingPatternUnit("zyi"),
          sub: [
            new TypingPatternUnit("zili"),
            new TypingPatternUnit("zixi"),
            new TypingPatternUnit("ji"),
            new TypingPatternUnit("jili"),
            new TypingPatternUnit("jixi"),
          ],
        },
      ],
      [
        "ぢゅ",
        {
          main: new TypingPatternUnit("dyu"),
          sub: [new TypingPatternUnit("dilyu"), new TypingPatternUnit("dixyu")],
        },
      ],
      [
        "ぢぇ",
        {
          main: new TypingPatternUnit("dye"),
          sub: [new TypingPatternUnit("dile"), new TypingPatternUnit("dixe")],
        },
      ],
      [
        "ぢょ",
        {
          main: new TypingPatternUnit("dyo"),
          sub: [new TypingPatternUnit("dilyo"), new TypingPatternUnit("dixyo")],
        },
      ],
      [
        "でぃ",
        {
          main: new TypingPatternUnit("dhi"),
          sub: [new TypingPatternUnit("deli"), new TypingPatternUnit("dexi")],
        },
      ],
      [
        "びぇ",
        {
          main: new TypingPatternUnit("bye"),
          sub: [new TypingPatternUnit("bile"), new TypingPatternUnit("bixe")],
        },
      ],
      [
        "ぴょ",
        {
          main: new TypingPatternUnit("pyo"),
          sub: [new TypingPatternUnit("pilyo"), new TypingPatternUnit("pixyo")],
        },
      ],
    ])("%s. YouonからRomajiに変換できる", (hiragana, pattern) => {
      const youon = new Youon(hiragana);
      const romaji = new Romaji(youon);
      expect(romaji).toBeInstanceOf(Romaji);
      expect(romaji.getTypingPattern().getMain()).toStrictEqual(pattern.main);
      expect(romaji.getTypingPattern().getSub()).toStrictEqual(pattern.sub);
    });
  });

  describe("Sokuon+OtherからRomajiへの変換", () => {
    test.each([
      [
        ["っ", "た"],
        new TypingPattern(new TypingPatternUnit("tta"), [
          new TypingPatternUnit("ltuta"),
          new TypingPatternUnit("xtuta"),
        ]),
      ],
      [
        ["っ", "か"],
        new TypingPattern(new TypingPatternUnit("kka"), [
          new TypingPatternUnit("cca"),
          new TypingPatternUnit("ltuka"),
          new TypingPatternUnit("ltuca"),
          new TypingPatternUnit("xtuka"),
          new TypingPatternUnit("xtuca"),
        ]),
      ],
      [
        ["っ", "か"],
        new TypingPattern(new TypingPatternUnit("kka"), [
          new TypingPatternUnit("cca"),
          new TypingPatternUnit("ltuka"),
          new TypingPatternUnit("ltuca"),
          new TypingPatternUnit("xtuka"),
          new TypingPatternUnit("xtuca"),
        ]),
      ],
      [
        ["っ", "つ"],
        new TypingPattern(new TypingPatternUnit("ttu"), [
          new TypingPatternUnit("ttsu"),
          new TypingPatternUnit("ltutu"),
          new TypingPatternUnit("ltutsu"),
          new TypingPatternUnit("xtutu"),
          new TypingPatternUnit("xtutsu"),
        ]),
      ],
    ])(
      "%s. Sokuon+OtherからRomajiへ変換できる",
      ([sokuonHiragana, otherHiragana], expected) => {
        const sokuon = Sokuon.fromHiragana(sokuonHiragana) as Sokuon;
        const other = Other.fromHiragana(otherHiragana) as Other;

        const romaji = new Romaji([sokuon, other]);
        expect(romaji.getTypingPattern()).toStrictEqual(expected);
      }
    );
  });

  describe("Sokuon+YouonからRomajiへの変換", () => {
    test.each([
      [
        ["っ", "きゃ"],
        new TypingPattern(new TypingPatternUnit("kkya"), [
          new TypingPatternUnit("kkilya"),
          new TypingPatternUnit("kkixya"),
          new TypingPatternUnit("ltukya"),
          new TypingPatternUnit("ltukilya"),
          new TypingPatternUnit("ltukixya"),
          new TypingPatternUnit("xtukya"),
          new TypingPatternUnit("xtukilya"),
          new TypingPatternUnit("xtukixya"),
        ]),
      ],
      [
        ["っ", "じゃ"],
        new TypingPattern(new TypingPatternUnit("zzya"), [
          new TypingPatternUnit("zzilya"),
          new TypingPatternUnit("zzixya"),
          new TypingPatternUnit("jja"),
          new TypingPatternUnit("jjilya"),
          new TypingPatternUnit("jjixya"),
          new TypingPatternUnit("ltuzya"),
          new TypingPatternUnit("ltuzilya"),
          new TypingPatternUnit("ltuzixya"),
          new TypingPatternUnit("ltuja"),
          new TypingPatternUnit("ltujilya"),
          new TypingPatternUnit("ltujixya"),
          new TypingPatternUnit("xtuzya"),
          new TypingPatternUnit("xtuzilya"),
          new TypingPatternUnit("xtuzixya"),
          new TypingPatternUnit("xtuja"),
          new TypingPatternUnit("xtujilya"),
          new TypingPatternUnit("xtujixya"),
        ]),
      ],
    ])(
      "%s. Sokuon+YouonからRomajiへ変換できる",
      ([sokuonHiragana, youonHiragana], expected) => {
        const sokuon = Sokuon.fromHiragana(sokuonHiragana) as Sokuon;
        const youon = Youon.fromHiragana(youonHiragana) as Youon;

        const romaji = new Romaji([sokuon, youon]);
        expect(romaji.getTypingPattern()).toStrictEqual(expected);
      }
    );
  });
});
