import { TypingPattern, TypingPatternUnit, RomajiConvertList } from ".";

export const sokuonConvertList: RomajiConvertList = {
  っ: new TypingPattern(new TypingPatternUnit("ltu"), [
    new TypingPatternUnit("xtu"),
  ]),
};
