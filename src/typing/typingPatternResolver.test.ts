import { describe, expect, test } from "vitest";
import {
  otherConvertList,
  TypingPattern,
  TypingPatternUnit,
} from "../typingPattern";
import { TypingPatternResolver } from "./typingPatternResolver";

describe("TypingPatternResolver", () => {
  describe("input", () => {
    test("正しい入力の場合、correctを返す", () => {
      const resolver = new TypingPatternResolver(otherConvertList["し"]);
      const result = resolver.input("s");

      expect(result).toEqual({
        result: "correct",
        filteredUnit: [
          new TypingPatternUnit("si"),
          new TypingPatternUnit("shi"),
        ],
        remainedAlphabet: "i",
        completedInputAlphabet: "s",
      });
    });

    test("パターンが完了した場合、completeを返す", () => {
      const resolver = new TypingPatternResolver(otherConvertList["し"]);
      resolver.input("s");
      const result = resolver.input("i");

      expect(result).toEqual({
        result: "complete",
        filteredUnit: [new TypingPatternUnit("si")],
      });
    });

    test("正しい入力の場合、correctを返す", () => {
      const resolver = new TypingPatternResolver(otherConvertList["し"]);
      const result = resolver.input("x");

      expect(result).toEqual({
        result: "fail",
        filteredUnit: [
          new TypingPatternUnit("si"),
          new TypingPatternUnit("shi"),
          new TypingPatternUnit("ci"),
        ],
      });
    });

    test("main以外の入力をしてもcorrectを返却する", () => {
      const resolver = new TypingPatternResolver(otherConvertList["し"]);
      const result = resolver.input("s");
      expect(result).toEqual({
        result: "correct",
        filteredUnit: [
          new TypingPatternUnit("si"),
          new TypingPatternUnit("shi"),
        ],
        remainedAlphabet: "i",
        completedInputAlphabet: "s",
      });

      const result2 = resolver.input("h");
      expect(result2).toEqual({
        result: "correct",
        filteredUnit: [new TypingPatternUnit("shi")],
        remainedAlphabet: "i",
        completedInputAlphabet: "sh",
      });

      // 間違える
      const result3 = resolver.input("x");
      expect(result3).toEqual({
        result: "fail",
        filteredUnit: [new TypingPatternUnit("shi")],
      });

      const result4 = resolver.input("i");
      expect(result4).toEqual({
        result: "complete",
        filteredUnit: [new TypingPatternUnit("shi")],
      });
    });
  });
});
