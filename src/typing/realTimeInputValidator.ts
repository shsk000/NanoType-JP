import { TypingUnits } from "../parseHiragana";
import { TypingPatternResolver } from "./typingPatternResolver";

type InputResult = {
  result: "correct" | "fail" | "complete";
  correctLength: number;
  selectedAlphabetSentence: string;
};

export class RealTimeInputValidator {
  /** 入力対象のTypingPatternResolverの配列番号 */
  private targetTypingPatternResolverNumber: number = 0;
  /**
   * 何文字目まで正解しているのか
   * 0は未正解
   */
  private correctLength: number = 0;
  private typingPatternResolvers: TypingPatternResolver[] = [];

  constructor() {}

  private patternUntisToPatternResolvers(typingUnits: TypingUnits) {
    return typingUnits.map(
      (unit) => new TypingPatternResolver(unit.getTypingPattern())
    );
  }

  private createToSelectedAlphabetSentence() {
    let sentence = "";
    this.typingPatternResolvers.forEach((resolver) => {
      sentence = sentence + resolver.getFlatPattern()[0].getAlphabet();
    });

    return sentence;
  }

  public getTypingPatternResolver() {
    return this.typingPatternResolvers;
  }

  public initialize(typingUnits: TypingUnits): string {
    this.typingPatternResolvers =
      this.patternUntisToPatternResolvers(typingUnits);
    this.correctLength = 0;
    this.targetTypingPatternResolverNumber = 0;

    return this.createToSelectedAlphabetSentence();
  }

  public input(alphabet: string): InputResult {
    const targetResolver =
      this.typingPatternResolvers[this.targetTypingPatternResolverNumber];
    const nextTargetResolver =
      this.typingPatternResolvers[this.targetTypingPatternResolverNumber + 1];

    const inputResult = targetResolver.input(alphabet);

    switch (inputResult.result) {
      case "correct":
        this.correctLength++;
        return {
          result: "correct",
          correctLength: this.correctLength,
          selectedAlphabetSentence: this.createToSelectedAlphabetSentence(),
        };
      case "complete":
        this.correctLength++;
        this.targetTypingPatternResolverNumber++;

        // 入力が完全に完了した
        if (!nextTargetResolver) {
          return {
            result: "complete",
            correctLength: this.correctLength,
            selectedAlphabetSentence: this.createToSelectedAlphabetSentence(),
          };
        }
        return {
          result: "correct",
          correctLength: this.correctLength,
          selectedAlphabetSentence: this.createToSelectedAlphabetSentence(),
        };
      case "fail":
        return {
          result: "fail",
          correctLength: this.correctLength,
          selectedAlphabetSentence: this.createToSelectedAlphabetSentence(),
        };
    }
  }
}
