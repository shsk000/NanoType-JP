import { Romaji } from "../parseHiragana/romaji";

/**
 * Romaji[]から全通りのアルファベット入力パターンを作成する
 */
export class AlphabetInputPattern {
  private allPatern: string[] = [];

  constructor(romajiArr: Romaji[]) {
    this.allPatern = this.createAllPattern(romajiArr);
  }

  public getAllPatern() {
    return this.allPatern;
  }

  private createAllPattern(romajiArr: Romaji[]): string[] {
    // アルファベット入力パターンを一文字ずつ配列にまとめる。
    const alphabetPatternFlat = romajiArr.map((romaji) => {
      const units = romaji.getRomajiPattern().getFlatRomajiPatternUnits();
      return units.map((unit) => unit.getAlphabet());
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
