/**
 * 促音
 */
export class Sokuon {
  private hiragana: string = "っ";

  public getHiragana(): string {
    return this.hiragana;
  }

  static isSokuon(hiragana: string): boolean {
    if (hiragana === "っ") {
      return true;
    }

    return false;
  }

  static fromHiragana(hiragana: string): Sokuon | undefined {
    if (Sokuon.isSokuon(hiragana)) {
      return new this();
    }

    console.debug(
      `Sokuon fromHiragana: target hiragana is not Sokuon. hiragana: ${hiragana}`
    );
  }
}
