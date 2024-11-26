export class RomajiPatternUnit {
  constructor(private alphabet: string) {}

  public getAlphabet(): string {
    return this.alphabet;
  }

  /**
   * 促音、先頭文字二回入力用のunit作成
   * た（ta） => った（tta）
   */
  static createSokuonDoubleInputUnit(patternUnit: RomajiPatternUnit) {
    const alphabet = patternUnit.getAlphabet();
    return new this(alphabet[0] + alphabet);
  }
}

export class RomajiPattern {
  constructor(
    /**
     * 一般的なローマ字
     */
    private main: RomajiPatternUnit,
    /**
     * ヘボン式等々、入力フォーマットとしてはあるものの一般的ではないローマ字
     */
    private sub?: RomajiPatternUnit[]
  ) {}

  public getMain(): RomajiPatternUnit {
    return this.main;
  }

  public getSub(): RomajiPatternUnit[] {
    return this.sub ? this.sub : [];
  }

  /**
   * main, sub関係なく一つの配列にまとめて返却する
   */
  public getFlatRomajiPatternUnits(): RomajiPatternUnit[] {
    return [this.getMain(), ...this.getSub()];
  }

  /**
   * 指定のRomajiPatternから「っか」（kka）など
   * 先頭文字を二回入力して促音と拗音またはその他を同時入力するパターンを作成する
   */
  static createSimultaneouslySokuonInputPattern(romajiPattern: RomajiPattern) {
    const main = RomajiPatternUnit.createSokuonDoubleInputUnit(
      romajiPattern.getMain()
    );
    const subs = romajiPattern
      .getSub()
      .map((unit) => {
        // NOTE: xやlは１文字ずつ入力するパターンのため返却値から除外する
        if (/[lx]/.test(unit.getAlphabet())) return undefined;
        return RomajiPatternUnit.createSokuonDoubleInputUnit(unit);
      })
      .filter((unit) => !!unit);

    if (subs.length === 0) {
      return new RomajiPattern(main);
    }

    return new RomajiPattern(main, subs);
  }

  /**
   * ２つのPattern情報をあわせる
   * oneのmainを新規RomajiPatternのmainにして
   * それ以外のone.sub, two.main, two.subは新規RomajiPatternのsubとしてまとめる
   */
  static concat(one: RomajiPattern, two: RomajiPattern): RomajiPattern {
    return new RomajiPattern(one.getMain(), [
      ...one.getSub(),
      two.getMain(),
      ...two.getSub(),
    ]);
  }

  /**
   * ２つのPattern情報をあわせる
   * 総当たりで全パターン網羅する
   */
  static concatFieldCombinations(one: RomajiPattern, two: RomajiPattern) {
    const oneMainAlphabet = one.getMain().getAlphabet();
    const twoMainAlphabet = two.getMain().getAlphabet();
    // main同士の結合を新規RomajiPatternのmainとする
    const main = new RomajiPatternUnit(oneMainAlphabet + twoMainAlphabet);

    // oneのmainを起点にtwoと総当たりしたデータ
    const oneMainConbinations = two.getSub().map((twoUnit) => {
      return new RomajiPatternUnit(oneMainAlphabet + twoUnit.getAlphabet());
    });

    // oneのsubを起点にtwoの全要素と総当りしたデータ
    const oneSubConbinations = one
      .getSub()
      .map((oneUnit) => {
        return two.getFlatRomajiPatternUnits().map((twoUnit) => {
          return new RomajiPatternUnit(
            oneUnit.getAlphabet() + twoUnit.getAlphabet()
          );
        });
      })
      .flat();

    const concat = oneMainConbinations.concat(oneSubConbinations);

    return new this(main, concat);
  }
}
