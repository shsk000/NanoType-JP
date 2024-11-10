import { createRomajiSentence } from "../parseHiragana/romajiSentence";
import { AlphabetInputPattern } from "./alphabetInputPattern";
import { InputValidator } from "./inputValidator";

type AnswerResult = {
  result: "correct" | "fail" | "complate";
  /** １タイプごと：入力失敗数 */
  failCount: number;
  /** １タイプごと：入力成功数 */
  correctCount: number;
  /** 入力が完了した文章数 */
  completedSentences: number;
  /** １タイプごと：入力失敗数 */
  perfectStreakCount: number;
};

export class TypingGame {
  private inputPattern: string[] = [];
  private inputValidator: InputValidator;

  /** １タイプごと：入力失敗数 */
  private failCount: number = 0;
  /** １タイプごと：入力成功数 */
  private correctCount: number = 0;
  /** 入力が完了した文章数 */
  private completedSentences: number = 0;
  /** １タイプごと：入力失敗数 */
  private perfectStreakCount: number = 0;

  constructor() {
    this.inputValidator = new InputValidator();
  }

  public initialize() {
    this.failCount = 0;
    this.correctCount = 0;
    this.completedSentences = 0;
    this.perfectStreakCount = 0;
  }

  public registerNewHiragana(hiragana: string) {
    const romajiSentence = createRomajiSentence(hiragana);
    const pattern = new AlphabetInputPattern(romajiSentence);
    this.inputPattern = pattern.getAllPatern();
    this.inputValidator.initialize(this.inputPattern);
  }

  public answerAlphabet(alphabet: string): AnswerResult {
    const { result } = this.inputValidator.input(alphabet);

    if (result === "correct") {
      this.correctCount++;
      return {
        result: "correct",
        failCount: this.failCount,
        correctCount: this.correctCount,
        completedSentences: this.completedSentences,
        perfectStreakCount: this.perfectStreakCount,
      };
    }

    if (result === "complate") {
      this.correctCount++;
      this.completedSentences++;
      this.perfectStreakCount++;

      return {
        result: "complate",
        failCount: this.failCount,
        correctCount: this.correctCount,
        completedSentences: this.completedSentences,
        perfectStreakCount: this.perfectStreakCount,
      };
    }

    this.failCount++;
    this.perfectStreakCount = 0;
    return {
      result: "fail",
      failCount: this.failCount,
      correctCount: this.correctCount,
      completedSentences: this.completedSentences,
      perfectStreakCount: this.perfectStreakCount,
    };
  }
}
