import { Other } from "../japaneseSounds/other";
import { Sokuon } from "../japaneseSounds/sokuon";
import { JapaneseSound } from "../japaneseSounds/type";
import { Youon } from "../japaneseSounds/youon";
import { getConvertUnit } from "../romajiPattern/getConvertUnit";
import { otherConvertList } from "../romajiPattern/otherConvertList";
import { RomajiPattern } from "../romajiPattern/romajiPattern";
import { sokuonConvertList } from "../romajiPattern/sokuonConvertList";
import { youonConvertList } from "./youonConvertList";

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

  //   private getOtherRomajiPattern(otherHiragana: string): RomajiPattern {
  //     const item = otherConvertList[otherHiragana];
  //     if (!item) {
  //       throw new Error(
  //         "Romaji getOtherRomajiPattern: 対象ひらがなに対応するローマ字が見つかりません"
  //       );
  //     }
  //     return item;
  //   }

  //   private getYouonRomajiPattern(youonHiragana: string): RomajiPattern {
  //     const item = youonConvertList[youonHiragana];
  //     if (!item) {
  //       throw new Error(
  //         "Romaji getYouonRomajiPattern: 対象ひらがなに対応するローマ字が見つかりません"
  //       );
  //     }
  //     return item;
  //   }

  //   private getSokuonRomajiPattern() {
  //     return sokuonConvertList["っ"];
  //   }

  private decisionRomajiPattern(input: InputUnit): RomajiPattern {
    if (input instanceof Other || input instanceof Youon) {
      return getConvertUnit(input);
    }

    if (input instanceof Array) {
      const secondSound = input[1];

      if (secondSound instanceof Other) {
        const otherRomajiPattern = getConvertUnit(secondSound);
        return RomajiPattern.createSokuonPattern(otherRomajiPattern);
      }

      throw new Error(
        "Romaji decisionRomajiPattern: 想定されるinputではありません"
      );
    }

    // return otherConvertList["あ"];

    throw new Error("test");
  }
}
