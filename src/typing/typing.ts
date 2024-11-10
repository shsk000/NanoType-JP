import { createRomajiSentence } from "../parseHiragana/romajiSentence";

export class TypingGame {
  constructor() {}

  public registerNewHiragana(hiragana: string) {
    const romajiSentence = createRomajiSentence(hiragana);
  }

  public answerAlphabet(alphabet: string) {}
}
