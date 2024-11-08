import { Other } from "../japaneseSounds/other";
import { Sokuon } from "../japaneseSounds/sokuon";
import { JapaneseSound } from "../japaneseSounds/type";
import { Youon } from "../japaneseSounds/youon";
import { otherConvertList } from "./convert";
import { RomajiPattern } from "./type";
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

  private getOtherRomajiPattern(otherHiragana: string): RomajiPattern {
    const item = otherConvertList[otherHiragana];
    if (!item) {
      throw new Error(
        "Romaji getOtherRomajiPattern: 対象ひらがなに対応するローマ字が見つかりません"
      );
    }
    return item;
  }

  private getYouonRomajiPattern(youonHiragana: string): RomajiPattern {
    const item = youonConvertList[youonHiragana];
    if (!item) {
      throw new Error(
        "Romaji getYouonRomajiPattern: 対象ひらがなに対応するローマ字が見つかりません"
      );
    }
    return item;
  }

  private decisionRomajiPattern(input: InputUnit): RomajiPattern {
    if (input instanceof Other) {
      return this.getOtherRomajiPattern(input.getHiragana());
    }

    if (input instanceof Youon) {
      return this.getYouonRomajiPattern(input.getHiragana());
    }

    if (input instanceof Array) {
      const firstSound = input[0];
      const secondSound = input[1];

      if (secondSound instanceof Other) {
        const otherHiragana = secondSound.getHiragana();
        const romajiPattern = this.getOtherRomajiPattern(otherHiragana);
        return {
          // 二文字目を二回入力するタイプパターン（例：った: tta）
          main: romajiPattern.main[0] + romajiPattern.main,
          //   sub:
        };
      }

      if (secondSound instanceof Youon) {
      }

      throw new Error(
        "Romaji decisionRomajiPattern: 想定されるinputではありません"
      );
    }

    return otherConvertList["あ"];
  }
}
