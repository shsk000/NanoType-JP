import { Other } from "../japaneseSounds/other";
import { Sokuon } from "../japaneseSounds/sokuon";
import { JapaneseSound } from "../japaneseSounds/type";
import { Youon } from "../japaneseSounds/youon";
import { otherConvertList } from "./otherConvertList";
import { RomajiPattern } from "./romajiPattern";
import { sokuonConvertList } from "./sokuonConvertList";
import { youonConvertList } from "./youonConvertList";

export const getConvertUnit = (sound: JapaneseSound): RomajiPattern => {
  if (sound instanceof Other) {
    const convertUnit = otherConvertList[sound.getHiragana()];
    if (!convertUnit)
      throw new Error("getConvertUnit: 変換情報が見つかりません");
    return convertUnit;
  }
  if (sound instanceof Youon) {
    const convertUnit = youonConvertList[sound.getHiragana()];
    if (!convertUnit)
      throw new Error("getConvertUnit: 変換情報が見つかりません");
    return convertUnit;
  }
  if (sound instanceof Sokuon) {
    return sokuonConvertList[sound.getHiragana()];
  }

  throw new Error(
    `getConvertUnit: 想定外の引数が設定されています. hiragana: ${sound}`
  );
};
