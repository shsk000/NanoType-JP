import { describe, expect, test } from "vitest";
import { TypingGame } from "./typingGame";

describe("typingGame.test.ts", () => {
  test("正解入力を行った際はresult: correct, 完了後はresult: complateを返却すること", () => {
    const game = new TypingGame();
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
    expect(result.result).toBe("complate");
  });

  test("patternがmain以外のものも入力できること", () => {
    const game = new TypingGame();
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
    expect(result.result).toBe("complate");
  });

  test("不正解の場合はresult: failを返却すること", () => {
    const game = new TypingGame();
    game.registerNewHiragana("かきくけこ");
    const result = game.answerAlphabet("a");
    expect(result.result).toBe("fail");
  });

  describe("正解・失敗数のCount", () => {
    test("成功するとcorrectCountがカウントアップされる", () => {
      const game = new TypingGame();
      game.registerNewHiragana("か");
      const result = game.answerAlphabet("k");
      expect(result).toStrictEqual({
        result: "correct",
        failCount: 0,
        correctCount: 1,
        completedSentences: 0,
        perfectStreakCount: 0,
      });
    });

    test("ノーミスで文章の入力が完了するとcorrectCountとperfectStreakCountとcompletedSentencesがカウントアップされる", () => {
      const game = new TypingGame();
      game.registerNewHiragana("か");
      game.answerAlphabet("k");
      const result = game.answerAlphabet("a");
      expect(result).toStrictEqual({
        result: "complate",
        failCount: 0,
        correctCount: 2,
        completedSentences: 1,
        perfectStreakCount: 1,
      });
    });

    test("失敗しながらも文章の入力が完了するとcorrectCountとperfectStreakCountとcompletedSentencesがカウントアップされる", () => {
      const game = new TypingGame();
      game.registerNewHiragana("か");
      game.answerAlphabet("k");
      // 間違える
      let result = game.answerAlphabet("t");
      expect(result).toStrictEqual({
        result: "fail",
        failCount: 1,
        correctCount: 1,
        completedSentences: 0,
        perfectStreakCount: 0,
      });

      result = game.answerAlphabet("a");
      expect(result).toStrictEqual({
        result: "complate",
        failCount: 1,
        correctCount: 2,
        completedSentences: 1,
        perfectStreakCount: 1,
      });
    });
  });
});