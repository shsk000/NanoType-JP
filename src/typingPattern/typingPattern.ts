export class TypingPatternUnit {
  constructor(private alphabet: string) {}

  public getAlphabet(): string {
    return this.alphabet;
  }

  /**
   * 促音、先頭文字二回入力用のunit作成
   * た（ta） => った（tta）
   */
  static createSokuonDoubleInputUnit(patternUnit: TypingPatternUnit) {
    const alphabet = patternUnit.getAlphabet();
    return new this(alphabet[0] + alphabet);
  }
}

/**
 * タイピング入力パターン情報管理クラス
 */
export class TypingPattern {
  constructor(
    /**
     * 一般的なローマ字
     */
    private main: TypingPatternUnit,
    /**
     * ヘボン式等々、入力フォーマットとしてはあるものの一般的ではないローマ字
     */
    private sub?: TypingPatternUnit[]
  ) {}

  public getMain(): TypingPatternUnit {
    return this.main;
  }

  public getSub(): TypingPatternUnit[] {
    return this.sub ? this.sub : [];
  }

  /**
   * main, sub関係なく一つの配列にまとめて返却する
   */
  public getFlatTypingPatternUnits(): TypingPatternUnit[] {
    return [this.getMain(), ...this.getSub()];
  }

  /**
   * 指定のTypingPatternから「っか」（kka）など
   * 先頭文字を二回入力して促音と拗音またはその他を同時入力するパターンを作成する
   */
  static createSimultaneouslySokuonInputPattern(typingPattern: TypingPattern) {
    const main = TypingPatternUnit.createSokuonDoubleInputUnit(
      typingPattern.getMain()
    );
    const subs = typingPattern
      .getSub()
      .map((unit) => {
        // NOTE: xやlは１文字ずつ入力するパターンのため返却値から除外する
        // if (/[lx]/.test(unit.getAlphabet())) return undefined;
        return TypingPatternUnit.createSokuonDoubleInputUnit(unit);
      })
      .filter((unit) => !!unit);

    if (subs.length === 0) {
      return new TypingPattern(main);
    }

    return new TypingPattern(main, subs);
  }

  /**
   * ２つのPattern情報をあわせる
   * oneのmainを新規TypingPatternのmainにして
   * それ以外のone.sub, two.main, two.subは新規TypingPatternのsubとしてまとめる
   */
  static concat(one: TypingPattern, two: TypingPattern): TypingPattern {
    return new TypingPattern(one.getMain(), [
      ...one.getSub(),
      two.getMain(),
      ...two.getSub(),
    ]);
  }

  /**
   * ２つのPattern情報をあわせる
   * 総当たりで全パターン網羅する
   */
  static concatFieldCombinations(one: TypingPattern, two: TypingPattern) {
    const oneMainAlphabet = one.getMain().getAlphabet();
    const twoMainAlphabet = two.getMain().getAlphabet();
    // main同士の結合を新規TypingPatternのmainとする
    const main = new TypingPatternUnit(oneMainAlphabet + twoMainAlphabet);

    // oneのmainを起点にtwoと総当たりしたデータ
    const oneMainConbinations = two.getSub().map((twoUnit) => {
      return new TypingPatternUnit(oneMainAlphabet + twoUnit.getAlphabet());
    });

    // oneのsubを起点にtwoの全要素と総当りしたデータ
    const oneSubConbinations = one
      .getSub()
      .map((oneUnit) => {
        return two.getFlatTypingPatternUnits().map((twoUnit) => {
          return new TypingPatternUnit(
            oneUnit.getAlphabet() + twoUnit.getAlphabet()
          );
        });
      })
      .flat();

    const concat = oneMainConbinations.concat(oneSubConbinations);

    return new this(main, concat);
  }
}
