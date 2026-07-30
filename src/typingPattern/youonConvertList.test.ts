import { describe, expect, test } from "vitest";
import { Youon } from "../japaneseSounds/youon";
import { youonConvertList } from "./youonConvertList";

describe("youonConvertList.test.ts", () => {
  test("拗音として成立する全ての組み合わせに入力パターンが存在する", () => {
    const missing = Youon.getAllYouonHiragana().filter(
      (hiragana) => !youonConvertList[hiragana]
    );

    expect(missing).toEqual([]);
  });

  test("入力パターンの全てが拗音として成立する組み合わせである", () => {
    const notYouon = Object.keys(youonConvertList).filter(
      (hiragana) => !Youon.isYouon(hiragana)
    );

    expect(notYouon).toEqual([]);
  });

  test("同一の拗音内で入力パターンが重複していない", () => {
    const duplicated = Object.entries(youonConvertList)
      .map(([hiragana, pattern]) => {
        const alphabets = pattern
          .getFlatTypingPatternUnits()
          .map((unit) => unit.getAlphabet());
        return {
          hiragana,
          duplicated: alphabets.filter(
            (alphabet, index) => alphabets.indexOf(alphabet) !== index
          ),
        };
      })
      .filter(({ duplicated }) => duplicated.length > 0);

    expect(duplicated).toEqual([]);
  });

  /**
   * TypingPatternResolverは入力確定を「絞り込み後の先頭パターンの長さ」で判定するため、
   * あるパターンが別のパターンの前方一致になっていると、長い方が入力できなくなる
   */
  test("同一の拗音内で他の入力パターンの前方一致になっているパターンがない", () => {
    const prefixed = Object.entries(youonConvertList)
      .map(([hiragana, pattern]) => {
        const alphabets = pattern
          .getFlatTypingPatternUnits()
          .map((unit) => unit.getAlphabet());
        return {
          hiragana,
          prefixed: alphabets.filter((alphabet) =>
            alphabets.some(
              (other) => other !== alphabet && other.startsWith(alphabet)
            )
          ),
        };
      })
      .filter(({ prefixed }) => prefixed.length > 0);

    expect(prefixed).toEqual([]);
  });
});
