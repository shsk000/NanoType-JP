type InputResult = {
  result: "correct" | "fail" | "complate";
};

export class InputValidator {
  /**
   * 何文字目まで正解しているのか
   * 0は未正解
   */
  private correctLength: number = 0;
  /** 判定対象のアルファベット情報 */
  private alphabetAllPatern: string[] = [];

  constructor() {}

  public initialize(alphabetAllPatern: string[]) {
    this.alphabetAllPatern = alphabetAllPatern;
    this.correctLength = 0;
  }

  public getCorrectLength() {
    return this.correctLength;
  }

  public getAlphabetAllPattern() {
    return this.alphabetAllPatern;
  }

  public input(alphabet: string): InputResult {
    // backspaceで入力削除はできないため、入力しなかったパターンは配列から除外する
    const filtered = this.alphabetAllPatern.filter((sentence) => {
      return sentence[this.correctLength] === alphabet;
    });

    // 正解がある
    if (filtered.length > 0) {
      this.alphabetAllPatern = filtered;
      this.correctLength++;

      if (filtered.length === 1 && filtered[0].length === this.correctLength) {
        return {
          result: "complate",
        };
      }

      return {
        result: "correct",
      };
    }

    return {
      result: "fail",
    };
  }
}
