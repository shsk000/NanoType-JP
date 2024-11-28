import { describe, expect, test } from "vitest";
import { InputValidator } from "./inputValidator";

describe("inputValidator.test.ts", () => {
  test("正解アルファベット入力をするたびにPatternがフィルタリングされ正解文字数が増えていくこと", () => {
    const validator = new InputValidator();
    validator.initialize(["aaa", "aab", "bbb"]);
    let result = validator.input("a");
    expect(result.result).toBe("correct");
    expect(result.correctLength).toBe(1);
    expect(result.selectedAlphabetSentence).toBe("aaa");
    expect(validator.getAlphabetAllPattern()).toStrictEqual(["aaa", "aab"]);

    result = validator.input("a");
    expect(result.result).toBe("correct");
    expect(result.correctLength).toBe(2);
    expect(result.selectedAlphabetSentence).toBe("aaa");
    expect(validator.getAlphabetAllPattern()).toStrictEqual(["aaa", "aab"]);

    result = validator.input("b");
    expect(result.result).toBe("complete");
    expect(result.correctLength).toBe(3);
    expect(result.selectedAlphabetSentence).toBe("aab");
    expect(validator.getAlphabetAllPattern()).toStrictEqual(["aab"]);
  });

  test("入力完了後に完了してもPatternや正解数が変動しないこと", () => {
    const validator = new InputValidator();
    validator.initialize(["a", "b", "c"]);
    let result = validator.input("a");
    expect(result.result).toBe("complete");
    expect(result.correctLength).toBe(1);
    expect(result.selectedAlphabetSentence).toBe("a");
    expect(validator.getAlphabetAllPattern()).toStrictEqual(["a"]);

    result = validator.input("b");
    expect(result.result).toBe("fail");
    expect(result.correctLength).toBe(1);
    expect(result.selectedAlphabetSentence).toBe("a");
    expect(validator.getAlphabetAllPattern()).toStrictEqual(["a"]);
  });

  test("入力を間違えPatternや正解数が変動しないこと", () => {
    const validator = new InputValidator();
    validator.initialize(["a", "b", "c"]);
    let result = validator.input("d");
    expect(result.result).toBe("fail");
    expect(result.correctLength).toBe(0);
    expect(result.selectedAlphabetSentence).toBe("a");
    expect(validator.getAlphabetAllPattern()).toStrictEqual(["a", "b", "c"]);
  });
});
