import { JapaneseSound, Other, Sokuon, Youon } from "../japaneseSounds";
import { soundsOrSymbolsParser } from "../parseSoundsOrSymbols";
import { Romaji } from "../romaji/romaji";
import { Symbols } from "../symbols";

export type TypeInputUnit = Array<Romaji | Symbols>;

/**
 * ひらがなの文章から入力情報を作成する
 */
export const parseHiragana = (hiraganaSentence: string): TypeInputUnit => {
  const soundsOrSymbols = soundsOrSymbolsParser(hiraganaSentence);

  const parsedHiragana: TypeInputUnit = [];

  for (let i = 0; i < soundsOrSymbols.length; i++) {
    const target = soundsOrSymbols[i];
    const nextSound = soundsOrSymbols[i + 1] as JapaneseSound | undefined;

    try {
      // Symbolsは入力情報も兼ね備えているため変換せずそのままpushする
      if (target instanceof Symbols) {
        parsedHiragana.push(target);
        continue;
      }

      // った、っきゃなどSokuon + Other, Sokuon + Youonの場合は二文字合わせてRomajiを生成する
      if (target instanceof Sokuon && nextSound) {
        if (nextSound instanceof Other) {
          parsedHiragana.push(new Romaji([target, nextSound]));
          i++;
          continue;
        }
        if (nextSound instanceof Youon) {
          parsedHiragana.push(new Romaji([target, nextSound]));
          i++;
          continue;
        }
      }

      parsedHiragana.push(new Romaji(target));
    } catch (error) {
      console.error(
        `parseHiragana: パースできません.処理をスキップします. hiragana: ${target}`
      );
    }
  }

  return parsedHiragana;
};
