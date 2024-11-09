import { RomajiPattern, RomajiPatternUnit } from "./romajiPattern";
import { RomajiConvertList } from "./type";

export const sokuonConvertList: RomajiConvertList = {
  っ: new RomajiPattern(new RomajiPatternUnit("ltu"), [
    new RomajiPatternUnit("xtu"),
  ]),
};
