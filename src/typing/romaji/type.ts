export type RomajiPattern = {
  /**
   * 一般的なローマ字
   */
  main: string;
  /**
   * ヘボン式等々、入力フォーマットとしてはあるものの一般的ではないローマ字
   */
  sub?: string[];
};

export type RomajiConvertList = Record<string, RomajiPattern>;
