// 拗音

export class Youon {
  constructor(private hiragana: string) {}

  public getHiragana(): string {
    return this.hiragana;
  }

  static isYouon(hiragana: string): boolean {
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

  static fromHiragana(hiragana: string) {
    if (hiragana.length !== 2) {
      throw new Error(
        `Youon fromHiragana: hiragana count is not correct. hiragana: ${hiragana}`
      );
    }

    if (Youon.isYouon(hiragana)) {
      return new this(hiragana);
    }

    throw new Error(
      `Youon fromHiragana: target hiragana is not Youon. hiragana: ${hiragana}`
    );
  }
}
