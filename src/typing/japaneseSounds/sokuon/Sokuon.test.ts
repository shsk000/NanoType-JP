import { describe, expect, test } from "vitest";
import { Sokuon } from "./Sokuon";

describe("sokuon.test.ts", () => {
  test("fromHiragana: 「っ」を入力するとSokuonクラスが返却される", () => {
    expect(Sokuon.fromHiragana("っ")).instanceOf(Sokuon);
  });
  test("fromHiragana: 「っ」以外はundefinedを返却する", () => {
    expect(Sokuon.fromHiragana("test")).toBeFalsy();
    expect(Sokuon.fromHiragana("あ")).toBeFalsy();
    expect(Sokuon.fromHiragana("ゃ")).toBeFalsy();
  });
});
