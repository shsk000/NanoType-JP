import { fullWidthToHalfWidth } from "./fullWidthToHarfWidth";

export class Symbols {
  constructor(private hiragana: string) {
    if (!Symbols.isSymbols(hiragana)) {
      throw new Error("Invalid Symbols character");
    }
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
