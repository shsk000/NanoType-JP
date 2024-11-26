/**
 * 拗音
 * このプログラムでは「大きい文字」、「小さい文字」どちらも合わせて一つの拗音とする
 */
export class Youon {
  constructor(private hiragana: string) {
    if (!Youon.isYouon(hiragana)) {
      throw new Error(
        `Youon: フォーマットを満たしていません, hiragana: ${hiragana}`
      );
    }
  }

  public getHiragana(): string {
    return this.hiragana;
  }

  public getFirstCharacterHiragana(): string {
    return this.hiragana[0];
  }

  public getSecondCharacterHiragana(): string {
    return this.hiragana[1];
  }

  /**
   * 小さい文字の判定
   * NOTE:「っ」は促音として判定したいため、捨て仮名の判定には含んでいない
   */
  static isSutegana(hiragana: any): boolean {
    if (
      hiragana === "ゃ" ||
      hiragana === "ゅ" ||
      hiragana === "ょ" ||
      hiragana === "ぁ" ||
      hiragana === "ぃ" ||
      hiragana === "ぅ" ||
      hiragana === "ぇ" ||
      hiragana === "ぉ"
    ) {
      return true;
    }

    return false;
  }

  static isYouon(hiragana: string): boolean {
    if (hiragana.length !== 2) return false;

    const [first, second] = hiragana;

    if (
      second === "ゃ" ||
      second === "ゅ" ||
      second === "ょ" ||
      second === "ぃ" ||
      second === "ぇ"
    ) {
      switch (first) {
        case "き":
        case "し":
        case "ち":
        case "て":
        case "に":
        case "ひ":
        case "み":
        case "り":
        case "ふ":
        case "ぎ":
        case "じ":
        case "ぢ":
        case "で":
        case "び":
        case "ぴ":
          return true;
      }
    }

    if (
      second === "ゃ" ||
      second === "ゅ" ||
      second === "ょ" ||
      second === "ぁ" ||
      second === "ぃ" ||
      second === "ぇ" ||
      second === "ぉ"
    ) {
      if (first === "ゔ") {
        return true;
      }
    }

    return false;
  }

  static fromHiragana(hiragana: string): Youon {
    return new this(hiragana);
  }
}
