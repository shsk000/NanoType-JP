import { createRomajiSentence } from "../parseHiragana/romajiSentence";
import { AlphabetInputPattern } from "./alphabetInputPattern";
import { InputValidator } from "./inputValidator";

type AnswerResult = {
  result: "correct" | "incorrect" | "finish";
};

export class TypingGame {
  private inputPattern: string[] = [];
  private inputValidator: InputValidator;

  constructor() {
    this.inputValidator = new InputValidator();
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
      return {
        result: "correct",
      };
    }

    if (result === "finish") {
      return {
        result: "finish",
      };
    }

    return {
      result: "incorrect",
    };
  }
}
