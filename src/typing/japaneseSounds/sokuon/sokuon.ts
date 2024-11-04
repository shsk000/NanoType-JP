// 促音

export class Sokuon {
  private hiragana: string = "っ";

  static fromHiragana(hiragana: String) {
    if (hiragana === "っ") {
      return new this();
    }

    throw new Error(`Target character is not Sokuon. character: ${hiragana}`);
  }
}
