import { Sokuon } from "../sokuon";
import { Youon } from "../youon";

// 清音,濁音,半濁音 全部まとめてOtherとする
export class Other {
  constructor(private hiragana: string) {}

  public getHiragana(): string {
    return this.hiragana;
  }

  static isOther(hiragana: string): boolean {
    const isYouon = Youon.isYouon(hiragana);
    const isSokuon = Sokuon.isSokuon(hiragana);

    if (!isYouon && !isSokuon) {
      return true;
    }

    return false;
  }

  static fromHiragana(hiragana: string): Other | undefined {
    if (Other.isOther(hiragana)) {
      return new this(hiragana);
    }

    console.debug(
      `Other fromHiragana: target hiragana is Youon or Sokuon. hiragana: ${hiragana}`
    );
  }
}
