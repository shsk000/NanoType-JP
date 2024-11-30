import { TypingPattern, TypingPatternUnit } from "../../typingPattern";
import { Character } from "../interface";
import { fullWidthToHalfWidth } from "./fullWidthToHarfWidth";

export class Symbols implements Character {
  // TODO:ひらがなの命名変更
  private hiragana: string;

  public typingPattern: TypingPattern;

  constructor(symbolString: string) {
    this.hiragana = symbolString;

    if (!Symbols.isSymbols(symbolString)) {
      throw new Error("Invalid Symbols character");
    }

    this.typingPattern = new TypingPattern(new TypingPatternUnit(symbolString));
  }

  public getTypingPattern(): TypingPattern {
    return this.typingPattern;
  }

  public getHiragana(): string {
    return this.hiragana;
  }

  public getHalfWidth(): string {
    return fullWidthToHalfWidth(this.hiragana);
  }

  static isSymbols(character: string): boolean {
    return /[！”＃＄％＆’（）＝～｜｛｝‘＊＋＿？＜＞、。￥；：」ー「＠＾－　]/.test(
      character
    );
  }
}
