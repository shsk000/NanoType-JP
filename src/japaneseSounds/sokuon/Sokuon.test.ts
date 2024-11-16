import { describe, expect, test } from "vitest";
import { Sokuon } from "./Sokuon";

describe("sokuon.test.ts", () => {
  test("fromHiragana: 「っ」を入力するとSokuonクラスが返却される", () => {
    expect(Sokuon.fromHiragana("っ")).instanceOf(Sokuon);
  });
  test("fromHiragana: 「っ」以外はErrorをThrowする", () => {
    expect(() => Sokuon.fromHiragana("test")).toThrowError();
    expect(() => Sokuon.fromHiragana("あ")).toThrowError();
    expect(() => Sokuon.fromHiragana("ゃ")).toThrowError();
  });
});
