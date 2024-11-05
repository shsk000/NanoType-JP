export type HiraganaRomajiItem = {
  /**
   * 一般的なローマ字
   */
  main: string;
  /**
   * ヘボン式等々、入力フォーマットとしてはあるものの一般的ではないローマ字
   */
  sub?: string[];
};

export type HiraganaRomajiMap = Record<string, HiraganaRomajiItem>;
