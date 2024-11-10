import { Other, Sokuon, Youon, JapaneseSound } from "../japaneseSounds";
import {
  otherConvertList,
  sokuonConvertList,
  youonConvertList,
  RomajiPattern,
} from "./";

/**
 * 拗音、促音、その他のデータからタイピング情報を取得する
 */
export const getConvertUnit = (sound: JapaneseSound): RomajiPattern => {
  if (sound instanceof Other) {
    const convertUnit = otherConvertList[sound.getHiragana()];
    if (!convertUnit)
      throw new Error(
        `getConvertUnit: 変換情報が見つかりません. hiragana: ${sound.getHiragana()}`
      );
    return convertUnit;
  }
  if (sound instanceof Youon) {
    const convertUnit = youonConvertList[sound.getHiragana()];
    if (!convertUnit)
      throw new Error(
        `getConvertUnit: 変換情報が見つかりません. hiragana: ${sound.getHiragana()}`
      );
    return convertUnit;
  }
  if (sound instanceof Sokuon) {
    return sokuonConvertList[sound.getHiragana()];
  }

  throw new Error(
    `getConvertUnit: 想定外の引数が設定されています. hiragana: ${sound}`
  );
};
