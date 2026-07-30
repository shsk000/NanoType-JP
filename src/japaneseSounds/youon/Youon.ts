/** 小さい文字（捨て仮名） */
const SUTEGANA = [
  "ゃ",
  "ゅ",
  "ょ",
  "ぁ",
  "ぃ",
  "ぅ",
  "ぇ",
  "ぉ",
] as const;

/**
 * 拗音として成立する「大きい文字」と「小さい文字」の組み合わせ表
 * NOTE: 外来音（ふぁ、うぇ、つぁ等）も含む
 *       ここに追加した組み合わせは youonConvertList にも入力パターンが必要
 *       （整合性は youonConvertList.test.ts で担保している）
 */
const youonCombinationList: Record<string, readonly string[]> = {
  き: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  し: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  ち: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  て: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  に: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  ひ: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  み: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  り: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  ぎ: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  じ: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  ぢ: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  で: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  び: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  ぴ: ["ゃ", "ぃ", "ゅ", "ぇ", "ょ"],
  // 外来音
  ふ: ["ゃ", "ぁ", "ぃ", "ゅ", "ぇ", "ぉ", "ょ"],
  ゔ: ["ゃ", "ぁ", "ぃ", "ゅ", "ぇ", "ぉ", "ょ"],
  い: ["ぇ"],
  う: ["ぁ", "ぃ", "ぇ", "ぉ"],
  く: ["ぁ", "ぃ", "ぇ", "ぉ"],
  ぐ: ["ぁ", "ぃ", "ぇ", "ぉ"],
  す: ["ぁ", "ぃ", "ぇ", "ぉ"],
  ず: ["ぁ", "ぃ", "ぇ", "ぉ"],
  つ: ["ぁ", "ぃ", "ぇ", "ぉ"],
  と: ["ぅ"],
  ど: ["ぅ"],
};

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
    return SUTEGANA.some((sutegana) => sutegana === hiragana);
  }

  static isYouon(hiragana: string): boolean {
    if (hiragana.length !== 2) return false;

    const [first, second] = hiragana;

    return !!youonCombinationList[first]?.includes(second);
  }

  /** 拗音として成立する全ての組み合わせを返却する */
  static getAllYouonHiragana(): string[] {
    return Object.entries(youonCombinationList).flatMap(([first, seconds]) =>
      seconds.map((second) => first + second)
    );
  }

  static fromHiragana(hiragana: string): Youon {
    return new this(hiragana);
  }
}
