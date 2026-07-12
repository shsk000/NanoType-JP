import { parseHiragana } from "../parseHiragana/parse";
import { RealTimeInputValidator } from "./realTimeInputValidator";
import { TypingPatternResolver } from "./typingPatternResolver";

/** タイプしたアルファベットの情報 */
type InputAlphabetResult = {
  /** 入力が完了したアルファベット */
  completedInputAlphabet: string;
  /** 残りの入力が必要なアルファベット */
  remainedAlphabet: string;
};

type AnswerResult = {
  result: "correct" | "fail" | "complete";
  /** １タイプごと：入力失敗数 */
  failCount: number;
  /** １タイプごと：入力成功数 */
  correctCount: number;
  /** 入力が完了した文章数 */
  completedCount: number;
  /** １タイプごと：入力失敗数 */
  perfectStreakCount: number;
  /**
   * 何個目の入力単位（モーラ）まで確定したか。totalUnitCount と合わせて使うと、
   * 拗音の代替入力等で単位あたりの打鍵数が変わっても、外部でローマ字の打鍵数から
   * 「かな側の今の位置」を近似する必要がなくなる。
   */
  resolvedUnitCount: number;

  inputAlphabet: InputAlphabetResult;
};

type RegisterResult = {
  inputAlphabet: InputAlphabetResult;
  inputPattern: TypingPatternResolver[];
  /** 入力単位（モーラ）の総数。resolvedUnitCount の分母として使う */
  totalUnitCount: number;
};

export class NanoTypeJp {
  private inputValidator: RealTimeInputValidator;

  /** １タイプごと：入力失敗数 */
  private failCount: number = 0;
  /** １タイプごと：入力成功数 */
  private correctCount: number = 0;
  /** 入力が完了した文章数 */
  private completedCount: number = 0;
  /** １タイプごと：入力失敗数 */
  private perfectStreakCount: number = 0;

  constructor() {
    this.inputValidator = new RealTimeInputValidator();
  }

  public initialize() {
    this.failCount = 0;
    this.correctCount = 0;
    this.completedCount = 0;
    this.perfectStreakCount = 0;
  }

  public registerNewHiragana(hiragana: string): RegisterResult {
    const parsedHiragana = parseHiragana(hiragana);

    if (parsedHiragana.length === 0) {
      throw new Error(
        `NanoTypeJp: 入力可能なパターンがありません. hiragana: ${hiragana}`
      );
    }
    const alphabetSentece = this.inputValidator.initialize(parsedHiragana);
    const inputPattern = this.inputValidator.getTypingPatternResolver();

    return {
      inputAlphabet: {
        remainedAlphabet: alphabetSentece,
        completedInputAlphabet: "",
      },
      inputPattern,
      totalUnitCount: inputPattern.length,
    };
  }

  public answerAlphabet(alphabet: string): AnswerResult {
    const response = this.inputValidator.input(alphabet);

    if (response.result === "correct") {
      this.correctCount++;
      return {
        result: "correct",
        failCount: this.failCount,
        correctCount: this.correctCount,
        completedCount: this.completedCount,
        perfectStreakCount: this.perfectStreakCount,
        resolvedUnitCount: response.resolvedUnitCount,
        inputAlphabet: {
          completedInputAlphabet: response.selectedAlphabetSentence.slice(
            0,
            response.correctLength
          ),
          remainedAlphabet: response.selectedAlphabetSentence.slice(
            response.correctLength
          ),
        },
      };
    }

    if (response.result === "complete") {
      this.correctCount++;
      this.completedCount++;
      this.perfectStreakCount++;

      return {
        result: "complete",
        failCount: this.failCount,
        correctCount: this.correctCount,
        completedCount: this.completedCount,
        perfectStreakCount: this.perfectStreakCount,
        resolvedUnitCount: response.resolvedUnitCount,
        inputAlphabet: {
          completedInputAlphabet: response.selectedAlphabetSentence.slice(
            0,
            response.correctLength
          ),
          remainedAlphabet: response.selectedAlphabetSentence.slice(
            response.correctLength
          ),
        },
      };
    }

    this.failCount++;
    this.perfectStreakCount = 0;
    return {
      result: "fail",
      failCount: this.failCount,
      correctCount: this.correctCount,
      completedCount: this.completedCount,
      perfectStreakCount: this.perfectStreakCount,
      resolvedUnitCount: response.resolvedUnitCount,
      inputAlphabet: {
        completedInputAlphabet: response.selectedAlphabetSentence.slice(
          0,
          response.correctLength
        ),
        remainedAlphabet: response.selectedAlphabetSentence.slice(
          response.correctLength
        ),
      },
    };
  }
}
