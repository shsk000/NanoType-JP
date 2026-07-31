import { describe, expect, test } from "vitest";
import { NanoTypeJp } from "./nanoTypeJp";

describe("typingGame.test.ts", () => {
  test("正解入力を行った際はresult: correct, 完了後はresult: completeを返却すること", () => {
    const game = new NanoTypeJp();
    game.registerNewHiragana("かきくけこ");

    let result = game.answerAlphabet("k");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("a");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("k");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("i");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("k");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("u");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("k");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("e");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("k");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("o");
    expect(result.result).toBe("complete");
  });

  test("patternがmain以外のものも入力できること", () => {
    const game = new NanoTypeJp();
    game.registerNewHiragana("かきくけこ");

    // kではなくcで入力する
    let result = game.answerAlphabet("c");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("a");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("k");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("i");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("k");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("u");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("k");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("e");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("c");
    expect(result.result).toBe("correct");
    result = game.answerAlphabet("o");
    expect(result.result).toBe("complete");
  });

  test("不正解の場合はresult: failを返却すること", () => {
    const game = new NanoTypeJp();
    game.registerNewHiragana("かきくけこ");
    const result = game.answerAlphabet("a");
    expect(result.result).toBe("fail");
  });

  test("連続で出題、回答ができること", () => {
    const game = new NanoTypeJp();
    game.registerNewHiragana("あいう");
    game.answerAlphabet("a");
    game.answerAlphabet("i");
    const result = game.answerAlphabet("u");
    expect(result.result).toBe("complete");

    game.registerNewHiragana("えお");
    game.answerAlphabet("e");
    const result2 = game.answerAlphabet("o");
    expect(result2.result).toBe("complete");
  });

  describe("正解・失敗数のCount", () => {
    test("成功するとcorrectCountがカウントアップされる", () => {
      const game = new NanoTypeJp();
      game.registerNewHiragana("か");
      const result = game.answerAlphabet("k");
      expect(result).toStrictEqual({
        result: "correct",
        failCount: 0,
        correctCount: 1,
        completedCount: 0,
        perfectStreakCount: 0,
        resolvedUnitCount: 0,
        inputAlphabet: {
          completedInputAlphabet: "k",
          remainedAlphabet: "a",
        },
      });
    });

    test("ノーミスで文章の入力が完了するとcorrectCountとperfectStreakCountとcompletedCountがカウントアップされる", () => {
      const game = new NanoTypeJp();
      game.registerNewHiragana("か");
      game.answerAlphabet("k");
      const result = game.answerAlphabet("a");
      expect(result).toStrictEqual({
        result: "complete",
        failCount: 0,
        correctCount: 2,
        completedCount: 1,
        perfectStreakCount: 1,
        resolvedUnitCount: 1,
        inputAlphabet: {
          completedInputAlphabet: "ka",
          remainedAlphabet: "",
        },
      });
    });

    test("失敗しながらも文章の入力が完了するとcorrectCountとperfectStreakCountとcompletedCountがカウントアップされる", () => {
      const game = new NanoTypeJp();
      game.registerNewHiragana("か");
      game.answerAlphabet("k");
      // 間違える
      let result = game.answerAlphabet("t");
      expect(result).toStrictEqual({
        result: "fail",
        failCount: 1,
        correctCount: 1,
        completedCount: 0,
        perfectStreakCount: 0,
        resolvedUnitCount: 0,
        inputAlphabet: {
          completedInputAlphabet: "k",
          remainedAlphabet: "a",
        },
      });

      result = game.answerAlphabet("a");
      expect(result).toStrictEqual({
        result: "complete",
        failCount: 1,
        correctCount: 2,
        completedCount: 1,
        perfectStreakCount: 1,
        resolvedUnitCount: 1,
        inputAlphabet: {
          completedInputAlphabet: "ka",
          remainedAlphabet: "",
        },
      });
    });
  });

  describe("エラー", () => {
    test("入力可能なパターンがない場合はエラーを返却する", () => {
      const game = new NanoTypeJp();
      expect(() => game.registerNewHiragana("a")).toThrowError();
    });
  });

  describe("resolvedUnitCount（利用側のゲームでの実プレイで見つかった回帰の再現）", () => {
    test("拗音の代替入力（si+小さいゅ）でも、直接入力（shu）と同じ単位数で完了する", () => {
      const direct = new NanoTypeJp();
      direct.registerNewHiragana("しゅうせいをあてる");
      let r = direct.answerAlphabet("s");
      expect(r.resolvedUnitCount).toBe(0); // しゅ、まだ未完了
      r = direct.answerAlphabet("h");
      r = direct.answerAlphabet("u"); // "shu" でしゅ完了
      expect(r.resolvedUnitCount).toBe(1);

      const split = new NanoTypeJp();
      const reg = split.registerNewHiragana("しゅうせいをあてる");
      expect(reg.totalUnitCount).toBe(8); // しゅ,う,せ,い,を,あ,て,る
      let r2 = split.answerAlphabet("s");
      expect(r2.resolvedUnitCount).toBe(0);
      r2 = split.answerAlphabet("i");
      expect(r2.resolvedUnitCount).toBe(0); // "si" だけではまだ「しゅ」未完了（小さいゅが残っている）
      r2 = split.answerAlphabet("l");
      r2 = split.answerAlphabet("y");
      r2 = split.answerAlphabet("u"); // "silyu" でしゅ完了
      expect(r2.resolvedUnitCount).toBe(1);
    });

    test("じょうたい：zi+小さいょ（l/xプレフィックス）でも、じょ完了で1、うが次", () => {
      const game = new NanoTypeJp();
      const reg = game.registerNewHiragana("じょうたいをかんりする");
      expect(reg.totalUnitCount).toBe(10); // じょ,う,た,い,を,か,ん,り,す,る
      let r = game.answerAlphabet("z");
      r = game.answerAlphabet("i");
      expect(r.resolvedUnitCount).toBe(0); // "zi" だけではじょ未完了
      r = game.answerAlphabet("l");
      expect(r.resolvedUnitCount).toBe(0); // 小さいょの途中でも0のまま（オーナー実プレイで見つかった回帰）
      r = game.answerAlphabet("y");
      r = game.answerAlphabet("o"); // "zilyo" でじょ完了
      expect(r.resolvedUnitCount).toBe(1);
    });

    test("あいで：単独母音（1打鍵で完了する単位）は打った瞬間に1つ進む", () => {
      const game = new NanoTypeJp();
      const reg = game.registerNewHiragana("あいであをじっそうする");
      expect(reg.totalUnitCount).toBe(10); // あ,い,で,あ,を,じ,っそ,う,す,る
      const r = game.answerAlphabet("a");
      expect(r.resolvedUnitCount).toBe(1); // 「あ」を打った瞬間に完了（オーナー実プレイで見つかった回帰）
    });
  });

  describe("外来音", () => {
    /** 入力した全ての打鍵のresultを返却する */
    const inputAll = (hiragana: string, alphabet: string) => {
      const game = new NanoTypeJp();
      game.registerNewHiragana(hiragana);
      return [...alphabet].map((char) => game.answerAlphabet(char).result);
    };

    /** 最後の打鍵でcompleteになる（＝途中でfailしない）ことを期待する */
    const expectCompleted = (hiragana: string, alphabet: string) => {
      expect(inputAll(hiragana, alphabet)).toStrictEqual([
        ...Array<string>(alphabet.length - 1).fill("correct"),
        "complete",
      ]);
    };

    test.each([
      ["ふぁ", "fa"],
      ["ふぃ", "fi"],
      ["ふぇ", "fe"],
      ["ふぉ", "fo"],
      ["ふゃ", "fya"],
      ["ふゅ", "fyu"],
      ["ふょ", "fyo"],
      ["いぇ", "ye"],
      ["うぁ", "wha"],
      ["うぃ", "wi"],
      ["うぇ", "we"],
      ["うぉ", "who"],
      ["ゔぁ", "va"],
      ["ゔぃ", "vi"],
      ["ゔぇ", "ve"],
      ["ゔぉ", "vo"],
      ["ゔゃ", "vya"],
      ["ゔゅ", "vyu"],
      ["ゔょ", "vyo"],
      ["つぁ", "tsa"],
      ["つぃ", "tsi"],
      ["つぇ", "tse"],
      ["つぉ", "tso"],
      ["くぁ", "qa"],
      ["くぃ", "qi"],
      ["くぇ", "qe"],
      ["くぉ", "qo"],
      ["ぐぁ", "gwa"],
      ["ぐぃ", "gwi"],
      ["ぐぇ", "gwe"],
      ["ぐぉ", "gwo"],
      ["すぁ", "swa"],
      ["すぃ", "swi"],
      ["すぇ", "swe"],
      ["すぉ", "swo"],
      ["ずぁ", "zwa"],
      ["ずぃ", "zwi"],
      ["ずぇ", "zwe"],
      ["ずぉ", "zwo"],
      ["とぅ", "twu"],
      ["どぅ", "dwu"],
      ["ゔ", "vu"],
    ])("%s は %s で入力できる", (hiragana, alphabet) => {
      expectCompleted(hiragana, alphabet);
    });

    test.each([
      // 「ふ」はfu/hu起点で分割入力する（fi起点では「ふぃ」＋小文字になってしまう）
      ["ふぇ", "fye"],
      ["ふぇ", "fwe"],
      ["ふぇ", "hwe"],
      ["ふぇ", "fule"],
      ["ふぇ", "fuxe"],
      ["ふぇ", "hule"],
      ["ふぇ", "huxe"],
      ["ふぁ", "fwa"],
      ["ふぁ", "hwa"],
      ["ふぁ", "fula"],
      ["ふゃ", "fulya"],
      ["ふゃ", "huxya"],
      ["うぇ", "whe"],
      ["うぇ", "ule"],
      ["うぇ", "wuxe"],
      ["ゔぁ", "vula"],
      ["ゔぃ", "vyi"],
      ["つぁ", "tula"],
      ["つぁ", "tsuxa"],
      ["くぁ", "kwa"],
      ["くぁ", "qwa"],
      ["くぁ", "kula"],
      ["くぃ", "qyi"],
      ["ぐぁ", "guxa"],
      ["すぃ", "suli"],
      ["とぅ", "toxu"],
    ])("%s は代替入力の %s でも入力できる", (hiragana, alphabet) => {
      expectCompleted(hiragana, alphabet);
    });

    test.each([
      ["っふぇ", "ffe"],
      ["っつぁ", "ttsa"],
      ["っゔぁ", "vva"],
      ["っふぇ", "ltufe"],
      ["っつぁ", "xtutsa"],
    ])("促音つきの %s は %s で入力できる", (hiragana, alphabet) => {
      expectCompleted(hiragana, alphabet);
    });

    test.each([
      ["ふぇありー", "feari-"],
      ["ふぁいる", "fairu"],
      ["ゔぁいおりん", "vaiorinn"],
      ["うぇぶさいと", "webusaito"],
      ["つぇっぺりん", "tsepperinn"],
      ["くぉーつ", "qo-tu"],
      ["とぅーす", "twu-su"],
    ])("文章 %s を %s で入力できる", (hiragana, alphabet) => {
      expectCompleted(hiragana, alphabet);
    });

    // 外来音は「ふぁ」等で一つの入力単位（モーラ）として扱われる
    test.each([
      ["ふぇ", 1],
      ["ふぁいる", 3],
      ["うぇぶ", 2],
      ["っつぁ", 1],
    ])("%s の入力単位数は %i である", (hiragana, totalUnitCount) => {
      const game = new NanoTypeJp();
      expect(game.registerNewHiragana(hiragana).totalUnitCount).toBe(
        totalUnitCount
      );
    });

    test("お手本のローマ字は一般的な入力パターンを返却する", () => {
      const game = new NanoTypeJp();
      const registered = game.registerNewHiragana("ふぇありー");
      expect(registered.inputAlphabet.remainedAlphabet).toBe("feari-");
    });
  });

  describe("「ぃ」の拗音（い段の親文字と混同していた回帰）", () => {
    test.each([
      ["しぃ", "syi"],
      ["しぃ", "sili"],
      ["しぃ", "shili"],
      ["ちぃ", "tyi"],
      ["ちぃ", "chili"],
      ["じぃ", "zyi"],
      ["じぃ", "jili"],
    ])("%s は %s で入力できる", (hiragana, alphabet) => {
      const game = new NanoTypeJp();
      game.registerNewHiragana(hiragana);
      const results = [...alphabet].map(
        (char) => game.answerAlphabet(char).result
      );
      expect(results).toStrictEqual([
        ...Array<string>(alphabet.length - 1).fill("correct"),
        "complete",
      ]);
    });

    test.each([
      ["し", "shi"],
      ["ち", "chi"],
      ["じ", "ji"],
    ])("%s は %s で入力できる（い段の親文字）", (hiragana, alphabet) => {
      const game = new NanoTypeJp();
      game.registerNewHiragana(hiragana);
      const results = [...alphabet].map(
        (char) => game.answerAlphabet(char).result
      );
      expect(results).toStrictEqual([
        ...Array<string>(alphabet.length - 1).fill("correct"),
        "complete",
      ]);
    });
  });
});
