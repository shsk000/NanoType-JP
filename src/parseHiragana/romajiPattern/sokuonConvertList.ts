import { RomajiPattern, RomajiPatternUnit, RomajiConvertList } from ".";

export const sokuonConvertList: RomajiConvertList = {
  っ: new RomajiPattern(new RomajiPatternUnit("ltu"), [
    new RomajiPatternUnit("xtu"),
  ]),
};
