/**
 * typingPatternクラスをもとにユーザーがどのパターンを入力しているのか判定するクラスです
 */

type InputResult =
  | {
      result: "fail" | "complete";
      filteredUnit: TypingPatternUnit[];
    }
  | {
      result: "correct";
      remainedAlphabet: string;
      completedInputAlphabet: string;
      filteredUnit: TypingPatternUnit[];
    };

import { TypingPattern, TypingPatternUnit } from "../typingPattern";

export class TypingPatternResolver {
  private flatPattern: TypingPatternUnit[];
  // TypingPatternUnitに対するアルファベットの入力が完了した文字数
  private alphabetInputNumber: number = 0;

  constructor(pattern: TypingPattern) {
    this.flatPattern = pattern.getFlatTypingPatternUnits();
  }

  public getFlatPattern() {
    return this.flatPattern;
  }

  public input(alphabet: string): InputResult {
    const filtered = this.flatPattern.filter((unit) => {
      return unit.getAlphabet()[this.alphabetInputNumber] === alphabet;
    });

    // 正解判定
    if (filtered.length > 0) {
      this.alphabetInputNumber++;
      this.flatPattern = filtered;
      const targetUnit = filtered[0];
      const targetUnitAlphabet = targetUnit.getAlphabet();

      // 最後まで入力を行ったパターン
      if (targetUnitAlphabet.length === this.alphabetInputNumber) {
        return {
          result: "complete",
          filteredUnit: this.flatPattern,
        };
      }

      return {
        result: "correct",
        filteredUnit: this.flatPattern,
        completedInputAlphabet: targetUnitAlphabet.slice(
          0,
          this.alphabetInputNumber
        ),
        remainedAlphabet: targetUnitAlphabet.slice(this.alphabetInputNumber),
      };
    }

    return {
      result: "fail",
      filteredUnit: this.flatPattern,
    };
  }
}
