import { Sokuon } from "../sokuon";
import { Youon } from "../youon";

// 清音,濁音,半濁音 全部まとめてOtherとする
export class Other {
  constructor(private hiragana: string) {}

  public getHiragana(): string {
    return this.hiragana;
  }

  static fromHiragana(hiragana: string) {
    const isYouon = Youon.isYouon(hiragana);
    const isSokuon = Sokuon.isSokuon(hiragana);

    if (!isYouon && !isSokuon) {
      return new this(hiragana);
    }

    throw new Error(
      `Other fromHiragana: target character is Youon or Sokuon. isYouon: ${isYouon}, isSokuon: ${isSokuon}`
    );
  }
}
