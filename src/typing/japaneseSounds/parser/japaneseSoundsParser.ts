import { Other } from "../other";
import { Sokuon } from "../sokuon";
import { Youon } from "../youon";

export const japaneseSoundsParser = (hiraganaSentence: string) => {
  const result: (Other | Sokuon | Youon)[] = [];

  for (let i = 0; i < hiraganaSentence.length; i++) {
    const targetHiragana = hiraganaSentence[i];
    const nextTargetHiragana: string | undefined = hiraganaSentence[i + 1] as
      | string
      | undefined;

    const isSokuon = Sokuon.isSokuon(targetHiragana);
    if (isSokuon) {
      result.push(Sokuon.fromHiragana(targetHiragana));
    }

    if (Youon.isSutegana(nextTargetHiragana)) {
      try {
        result.push(Youon.fromHiragana(targetHiragana + nextTargetHiragana));
        // 二文字使って拗音クラスを作成しているため、ループ回数を手動で回す
        i++;
        continue;
      } catch (e) {
        // エラーになる場合は１文字ずつOtherクラスを作成する
        // 「あぁ」など拗音タイピングのフォーマットとしてはないが、日本語として存在するパターンがある
        console.error(e);
      }
    }

    const isOher = Other.isOther(targetHiragana);
    if (isOher) {
      result.push(Other.fromHiragana(targetHiragana));
    }
  }

  return result;
};
