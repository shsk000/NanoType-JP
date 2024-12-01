import { describe, expect, test } from "vitest";
import { RealTimeInputValidator } from "./realTimeInputValidator";
import { Other } from "../japaneseSounds";
import { Romaji } from "../character/romaji";
import { parseHiragana } from "../parseHiragana";

describe("realTimeInputValidator.test.ts", () => {
  test("Otherの複数文字入力を正しく入力できる", () => {
    const typingUnits = [
      new Romaji(new Other("あ")),
      new Romaji(new Other("い")),
      new Romaji(new Other("う")),
    ];
    const validator = new RealTimeInputValidator();
    validator.initialize(typingUnits);

    const result = validator.input("a");
    expect(result).toEqual({
      result: "correct",
      correctLength: 1,
      selectedAlphabetSentence: "aiu",
    });

    const result2 = validator.input("i");
    expect(result2).toEqual({
      result: "correct",
      correctLength: 2,
      selectedAlphabetSentence: "aiu",
    });

    // ミス
    const result3 = validator.input("x");
    expect(result3).toEqual({
      result: "fail",
      correctLength: 2,
      selectedAlphabetSentence: "aiu",
    });

    const result4 = validator.input("u");
    expect(result4).toEqual({
      result: "complete",
      correctLength: 3,
      selectedAlphabetSentence: "aiu",
    });
  });

  test("入力パターン変更時、selectedAlphabetSentenceが更新されること", () => {
    const typingUnits = [
      new Romaji(new Other("さ")),
      new Romaji(new Other("し")),
      new Romaji(new Other("す")),
    ];
    const validator = new RealTimeInputValidator();
    validator.initialize(typingUnits);

    expect(validator.input("s")).toEqual({
      result: "correct",
      correctLength: 1,
      selectedAlphabetSentence: "sasisu",
    });
    // ミス
    expect(validator.input("x")).toEqual({
      result: "fail",
      correctLength: 1,
      selectedAlphabetSentence: "sasisu",
    });
    expect(validator.input("a")).toEqual({
      result: "correct",
      correctLength: 2,
      selectedAlphabetSentence: "sasisu",
    });
    // sではなくcを入力してパターンを変更する
    expect(validator.input("c")).toEqual({
      result: "correct",
      correctLength: 3,
      selectedAlphabetSentence: "sacisu",
    });
    expect(validator.input("i")).toEqual({
      result: "correct",
      correctLength: 4,
      selectedAlphabetSentence: "sacisu",
    });
    expect(validator.input("s")).toEqual({
      result: "correct",
      correctLength: 5,
      selectedAlphabetSentence: "sacisu",
    });
    expect(validator.input("u")).toEqual({
      result: "complete",
      correctLength: 6,
      selectedAlphabetSentence: "sacisu",
    });
  });

  test("Youonの複数文字入力を正しく入力できる", () => {
    const typingUnits = parseHiragana("ぱっきゃお");
    console.dir(JSON.stringify(typingUnits));
    const validator = new RealTimeInputValidator();
    validator.initialize(typingUnits);

    expect(validator.input("p")).toEqual({
      result: "correct",
      correctLength: 1,
      selectedAlphabetSentence: "pakkyao",
    });
    expect(validator.input("a")).toEqual({
      result: "correct",
      correctLength: 2,
      selectedAlphabetSentence: "pakkyao",
    });
    expect(validator.input("k")).toEqual({
      result: "correct",
      correctLength: 3,
      selectedAlphabetSentence: "pakkyao",
    });
    expect(validator.input("k")).toEqual({
      result: "correct",
      correctLength: 4,
      selectedAlphabetSentence: "pakkyao",
    });
    expect(validator.input("i")).toEqual({
      result: "correct",
      correctLength: 5,
      selectedAlphabetSentence: "pakkilyao",
    });
    // ミス
    expect(validator.input("i")).toEqual({
      result: "fail",
      correctLength: 5,
      selectedAlphabetSentence: "pakkilyao",
    });
    expect(validator.input("x")).toEqual({
      result: "correct",
      correctLength: 6,
      selectedAlphabetSentence: "pakkixyao",
    });
    expect(validator.input("y")).toEqual({
      result: "correct",
      correctLength: 7,
      selectedAlphabetSentence: "pakkixyao",
    });
    expect(validator.input("a")).toEqual({
      result: "correct",
      correctLength: 8,
      selectedAlphabetSentence: "pakkixyao",
    });
    expect(validator.input("o")).toEqual({
      result: "complete",
      correctLength: 9,
      selectedAlphabetSentence: "pakkixyao",
    });
  });
});
