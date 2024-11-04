// 促音

export class Sokuon {
  private hiragana: string = "っ";

  public getHiragana(): String {
    return this.hiragana;
  }

  static fromHiragana(hiragana: String) {
    if (hiragana === "っ") {
      return new this();
    }

    throw new Error(
      `Sokuon fromHiragana: target character is not Sokuon. character: ${hiragana}`
    );
  }
}
