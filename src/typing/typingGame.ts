import { createRomajiSentence } from "../parseHiragana/romajiSentence";
import { AlphabetInputPattern } from "./alphabetInputPattern";

export class TypingGame {
  private inputPattern: string[] = [];

  constructor() {}

  public registerNewHiragana(hiragana: string) {
    const romajiSentence = createRomajiSentence(hiragana);
    const pattern = new AlphabetInputPattern(romajiSentence);
    this.inputPattern = pattern.getAllPatern();
  }

  public answerAlphabet(alphabet: string) {}
}
