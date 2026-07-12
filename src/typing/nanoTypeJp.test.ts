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
});
