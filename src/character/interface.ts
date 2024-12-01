import { TypingPattern } from "../typingPattern";

export interface Character {
  typingPattern: TypingPattern;

  getTypingPattern(): TypingPattern;
}
