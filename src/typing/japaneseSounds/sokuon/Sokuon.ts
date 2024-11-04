// 促音

export class Sokuon {
  private hiragana: string = "っ";

  public getHiragana(): String {
    return this.hiragana;
  }

  static isSokuon(hiragana: String): boolean {
    if (hiragana === "っ") {
      return true;
    }

    return false;
  }

  static fromHiragana(hiragana: String) {
    if (Sokuon.isSokuon(hiragana)) {
      return new this();
    }

    throw new Error(
      `Sokuon fromHiragana: target character is not Sokuon. character: ${hiragana}`
    );
  }
}
