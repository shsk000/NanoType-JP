import { TypingUnit } from "../parseHiragana";
import { Romaji } from "../romaji";

/**
 * Romaji[]から全通りのアルファベット入力パターンを作成する
 */
export class AlphabetInputPattern {
  private allPatern: string[] = [];

  constructor(typeInputUnit: TypingUnit) {
    this.allPatern = this.createAllPattern(typeInputUnit);
  }

  public getAllPatern() {
    return this.allPatern;
  }

  private createAllPattern(typeInputUnit: TypingUnit): string[] {
    // アルファベット入力パターンを一文字ずつ配列にまとめる。
    const alphabetPatternFlat = typeInputUnit.map((romajiOrSymbols) => {
      if (romajiOrSymbols instanceof Romaji) {
        const units = romajiOrSymbols
          .getTypingPattern()
          .getFlatTypingPatternUnits();
        return units.map((unit) => unit.getAlphabet());
      }
      return [romajiOrSymbols.getHalfWidth()];
    });

    // [ [ 'ka', 'ca' ], [ 'ki' ], [ 'ku' ], [ 'ke' ], [ 'ko', 'co' ] ]
    // のようなアルファベット入力パターンから全通りの組み合わせたデータを作成する
    // 結果は[ 'kakikukeko', 'kakikukeco', 'cakikukeko', 'cakikukeco' ]となる
    const combinations = (alphabetPattern: string[][]): string[] =>
      alphabetPattern.reduce(
        (accumulator, currentValue) => {
          return accumulator.flatMap((accAlphabet) =>
            currentValue.map((currentAlphabet) => accAlphabet + currentAlphabet)
          );
        },
        [""]
      );

    return combinations(alphabetPatternFlat);
  }
}
