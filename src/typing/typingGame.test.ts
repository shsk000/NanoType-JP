import { describe, expect, test } from "vitest";
import { TypingGame } from "./typingGame";

describe("typingGame.test.ts", () => {
  test("正解入力を行った際はresult: correct, 完了後はresult: finishを返却すること", () => {
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
    expect(result.result).toBe("finish");
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
    expect(result.result).toBe("finish");
  });

  test("不正解の場合はresult: incorrectを返却すること", () => {
    const game = new TypingGame();
    game.registerNewHiragana("かきくけこ");
    const result = game.answerAlphabet("a");
    expect(result.result).toBe("incorrect");
  });
});
