import { Other } from "../japaneseSounds/other";
import { Sokuon } from "../japaneseSounds/sokuon";
import { JapaneseSound } from "../japaneseSounds/type";
import { Youon } from "../japaneseSounds/youon";
import { getConvertUnit } from "../romajiPattern/getConvertUnit";
import { RomajiPattern } from "../romajiPattern/romajiPattern";

// １入力のパターン情報
// Sokuon, Other:「っか」（kka）などのパターン
// Sokuon, Youon:「っきゃ」(kkya)などのパターン
type InputUnit = JapaneseSound | [Sokuon, Other] | [Sokuon, Youon];

/**
 * ひらがなをローマ字に変換するクラス
 * タイピング時、変換の単位のため「っきゃ」(kkya)で１インスタンスとなる
 */
export class Romaji {
  /** ローマ字タイプ入力のパターンデータ */
  private romajiPattern: RomajiPattern;

  constructor(private inputUnit: InputUnit) {
    this.romajiPattern = this.decisionRomajiPattern(inputUnit);
  }

  public getRomajiPattern(): RomajiPattern {
    return this.romajiPattern;
  }

  private decisionRomajiPattern(input: InputUnit): RomajiPattern {
    if (input instanceof Other || input instanceof Youon) {
      return getConvertUnit(input);
    }

    if (input instanceof Array) {
      const firstSound = input[0];
      const secondSound = input[1];

      // 促音+その他の場合（った、っかなど）
      if (secondSound instanceof Other) {
        const sokuonRomajiPattern = getConvertUnit(firstSound);
        const otherRomajiPattern = getConvertUnit(secondSound);
        // 促音とその他を一文字ずつ入力した際のパターン情報
        const singleInputCombinations = RomajiPattern.concatFieldCombinations(
          sokuonRomajiPattern,
          otherRomajiPattern
        );
        // 促音とその他を同時に入力した際のパターン情報
        const simultaneouslyInputCombinations =
          RomajiPattern.createSimultaneouslySokuonInputPattern(
            otherRomajiPattern
          );
        return RomajiPattern.concat(
          simultaneouslyInputCombinations,
          singleInputCombinations
        );
      }

      throw new Error(
        "Romaji decisionRomajiPattern: 想定される入力ではありません"
      );
    }

    throw new Error("TODO: error handling");
  }
}
