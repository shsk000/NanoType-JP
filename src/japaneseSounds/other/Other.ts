// 清音,濁音,半濁音 全部まとめてOtherとする
export class Other {
  constructor(private hiragana: string) {
    if (!Other.isOther(hiragana)) {
      throw new Error(
        `Other: フォーマットを満たしていません, hiragana: ${hiragana}`
      );
    }
  }

  public getHiragana(): string {
    return this.hiragana;
  }

  static isOther(hiragana: string): boolean {
    if (hiragana.length > 1) return false;
    if (hiragana === "っ") return false;
    return /[ぁ-ゔ]/.test(hiragana);
  }

  static fromHiragana(hiragana: string): Other {
    return new this(hiragana);
  }
}
