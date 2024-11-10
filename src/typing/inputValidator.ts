type InputResult = {
  result: "correct" | "incorrect" | "finish";
};

export class InputValidator {
  /**
   * 何文字目まで正解しているのか
   * 0は未正解
   */
  private correctLength: number = 0;

  constructor(private alphabetAllPatern: string[]) {}

  public getCorrectLength() {
    return this.correctLength;
  }

  public getAlphabetAllPattern() {
    return this.alphabetAllPatern;
  }

  public input(alphabet: string): InputResult {
    const filtered = this.alphabetAllPatern.filter((sentence) => {
      return sentence[this.correctLength] === alphabet;
    });

    // 正解がある
    if (filtered.length > 0) {
      this.alphabetAllPatern = filtered;
      this.correctLength++;

      console.log(this.alphabetAllPatern);

      if (filtered.length === 1 && filtered[0].length === this.correctLength) {
        return {
          result: "finish",
        };
      }

      return {
        result: "correct",
      };
    }

    return {
      result: "incorrect",
    };
  }
}
