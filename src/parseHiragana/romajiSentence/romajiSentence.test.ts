import { describe, expect, test } from "vitest";
import { createRomajiSentence } from "./romajiSentence";
import { Other, Sokuon, Youon } from "../japaneseSounds";
import { Romaji } from "../romaji/romaji";

describe("romajiSentence.test.ts", () => {
  test("Otherのみ", () => {
    const sentence = createRomajiSentence("あいうえお");
    expect(sentence).toStrictEqual([
      new Romaji(new Other("あ")),
      new Romaji(new Other("い")),
      new Romaji(new Other("う")),
      new Romaji(new Other("え")),
      new Romaji(new Other("お")),
    ]);
  });

  test("Sokuonあり", () => {
    const sentence = createRomajiSentence("あるてっつぁ");
    expect(sentence).toStrictEqual([
      new Romaji(new Other("あ")),
      new Romaji(new Other("る")),
      new Romaji(new Other("て")),
      new Romaji([new Sokuon(), new Other("つ")]),
      new Romaji(new Other("ぁ")),
    ]);
  });

  test("Youonあり", () => {
    const sentence = createRomajiSentence("ちょもらんま");
    expect(sentence).toStrictEqual([
      new Romaji(new Youon("ちょ")),
      new Romaji(new Other("も")),
      new Romaji(new Other("ら")),
      new Romaji(new Other("ん")),
      new Romaji(new Other("ま")),
    ]);
  });

  test("Sokuon + Youonあり", () => {
    const sentence = createRomajiSentence("ぱっきゃお");
    expect(sentence).toStrictEqual([
      new Romaji(new Other("ぱ")),
      new Romaji([new Sokuon(), new Youon("きゃ")]),
      new Romaji(new Other("お")),
    ]);
  });

  test("末尾に促音がくる", () => {
    const sentence = createRomajiSentence("っつっっぁぃ");
    expect(sentence).toStrictEqual([
      new Romaji([new Sokuon(), new Other("つ")]),
      new Romaji(new Sokuon()),
      new Romaji([new Sokuon(), new Other("ぁ")]),
      new Romaji(new Other("ぃ")),
    ]);
  });
});
