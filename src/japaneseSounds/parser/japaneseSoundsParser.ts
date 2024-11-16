import { Other } from "../other";
import { Sokuon } from "../sokuon";
import { JapaneseSound } from "../type";
import { Youon } from "../youon";

/**
 * ひらがなの文章を促音・拗音・その他にパースする
 */
export const japaneseSoundsParser = (hiraganaSentence: string) => {
  const result: JapaneseSound[] = [];

  for (let i = 0; i < hiraganaSentence.length; i++) {
    const targetHiragana = hiraganaSentence[i];
    const nextTargetHiragana: string | undefined = hiraganaSentence[i + 1] as
      | string
      | undefined;

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

    throw new Error(
      `japaneseSoundsParser: パースできません. hiragna: ${targetHiragana}`
    );
  }

  return result;
};
