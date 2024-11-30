import { Other, Sokuon, Youon, JapaneseSound } from "../japaneseSounds";
import { getConvertUnit, TypingPattern } from "../typingPattern";

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
  private typingPattern: TypingPattern;

  constructor(inputUnit: InputUnit) {
    this.typingPattern = this.decisionTypingPattern(inputUnit);
  }

  public getTypingPattern(): TypingPattern {
    return this.typingPattern;
  }

  private decisionTypingPattern(input: InputUnit): TypingPattern {
    if (
      input instanceof Other ||
      input instanceof Youon ||
      input instanceof Sokuon
    ) {
      return getConvertUnit(input);
    }

    if (input instanceof Array) {
      const firstSound = input[0];
      const secondSound = input[1];

      // 促音+その他または促音+拗音のパターン
      // 入力の仕様としては一緒だったのでまとめてます
      if (secondSound instanceof Other || secondSound instanceof Youon) {
        const sokuonTypingPattern = getConvertUnit(firstSound);
        const otherOrYouonTypingPattern = getConvertUnit(secondSound);
        // 促音とその他または拗音を一文字ずつ入力した際のパターン情報
        const singleInputCombinations = TypingPattern.concatFieldCombinations(
          sokuonTypingPattern,
          otherOrYouonTypingPattern
        );
        // 促音とその他または拗音を同時に入力した際のパターン情報
        const simultaneouslyInputCombinations =
          TypingPattern.createSimultaneouslySokuonInputPattern(
            otherOrYouonTypingPattern
          );
        return TypingPattern.concat(
          simultaneouslyInputCombinations,
          singleInputCombinations
        );
      }

      throw new Error(
        "Romaji decisionTypingPattern: 想定される入力ではありません"
      );
    }

    console.error(input);
    throw new Error(
      `Romaji decisionTypingPattern: 入力値が不正でRomajiを作成できませんでした.`
    );
  }
}
