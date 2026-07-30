import { describe, expect, test } from "vitest";
import { Other } from "../japaneseSounds/other";
import { otherConvertList } from "./otherConvertList";

/** Other（清音・濁音・半濁音・捨て仮名）として成立する全てのひらがな */
const allOtherHiragana = Array.from(
  { length: "ゔ".charCodeAt(0) - "ぁ".charCodeAt(0) + 1 },
  (_, index) => String.fromCharCode("ぁ".charCodeAt(0) + index)
).filter((hiragana) => Other.isOther(hiragana));

describe("otherConvertList.test.ts", () => {
  test("Otherとして成立する全てのひらがなに入力パターンが存在する", () => {
    const missing = allOtherHiragana.filter(
      (hiragana) => !otherConvertList[hiragana]
    );

    expect(missing).toEqual([]);
  });

  test("同一のひらがな内で入力パターンが重複していない", () => {
    const duplicated = Object.entries(otherConvertList)
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
});
