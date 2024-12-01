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
});
