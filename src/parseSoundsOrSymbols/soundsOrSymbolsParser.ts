import { Other } from "../japaneseSounds/other";
import { Sokuon } from "../japaneseSounds/sokuon";
import { JapaneseSound } from "../japaneseSounds/type";
import { Youon } from "../japaneseSounds/youon";
import { Symbols } from "../symbols";

type JapaneseSoundOrSymbols = JapaneseSound | Symbols;

/**
 * ひらがなの文章を促音・拗音・その他または記号クラスにパースする
 */
export const soundsOrSymbolsParser = (hiraganaSentence: string) => {
  const result: JapaneseSoundOrSymbols[] = [];

  for (let i = 0; i < hiraganaSentence.length; i++) {
    try {
      const targetHiragana = hiraganaSentence[i];
      const nextTargetHiragana: string | undefined = hiraganaSentence[i + 1] as
        | string
        | undefined;

      if (Symbols.isSymbols(targetHiragana)) {
        const symbols = new Symbols(targetHiragana);
        result.push(symbols);
        continue;
      }

      if (Sokuon.isSokuon(targetHiragana)) {
        const sokuon = Sokuon.fromHiragana(targetHiragana);
        result.push(sokuon);
        continue;
      }

      if (
        Youon.isSutegana(nextTargetHiragana) &&
        Youon.isYouon(targetHiragana + nextTargetHiragana)
      ) {
        const youon = Youon.fromHiragana(targetHiragana + nextTargetHiragana);
        if (youon) {
          result.push(youon);
          // 二文字使って拗音クラスを作成しているため、ループ回数を手動で回す
          i++;
          continue;
        }
        // 「あぁ」など拗音タイピングのフォーマットとしてはないが、日本語として存在するパターンがある
        // その場合１文字ずつOtherクラスを作成する
      }

      if (Other.isOther(targetHiragana)) {
        const other = Other.fromHiragana(targetHiragana);
        result.push(other);
        continue;
      }

      console.warn(
        `soundsOrSymbolsParser: どの文字クラスにも当てはまりません.パースをスキップします. targetHiragana: ${targetHiragana}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  return result;
};
