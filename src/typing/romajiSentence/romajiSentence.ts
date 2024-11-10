import { JapaneseSound, Other, Sokuon, Youon } from "../japaneseSounds";
import { japaneseSoundsParser } from "../japaneseSounds/parser";
import { Romaji } from "../romaji/romaji";

/**
 * ひらがなの文章からRomajiPattern情報を作成する
 */
export const createRomajiSentence = (hiraganaSentence: string): Romaji[] => {
  const sounds = japaneseSoundsParser(hiraganaSentence);

  const romajiSentence: Romaji[] = [];

  for (let i = 0; i < sounds.length; i++) {
    const targetSound = sounds[i];
    const nextSound = sounds[i + 1] as JapaneseSound | undefined;

    // った、っきゃなどSokuon + Other, Sokuon + Youonの場合は二文字合わせてRomajiを生成する
    if (targetSound instanceof Sokuon && nextSound) {
      if (nextSound instanceof Other) {
        romajiSentence.push(new Romaji([targetSound, nextSound]));
        i++;
        continue;
      }
      if (nextSound instanceof Youon) {
        romajiSentence.push(new Romaji([targetSound, nextSound]));
        i++;
        continue;
      }
    }

    romajiSentence.push(new Romaji(targetSound));
  }

  return romajiSentence;
};
