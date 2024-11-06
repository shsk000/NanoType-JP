import { Other } from "../japaneseSounds/other";
import { JapaneseSound } from "../japaneseSounds/type";
import { otherConvertList } from "./convert";
import { RomajiPattern } from "./type";

export class Romaji {
  private romajiPattern: RomajiPattern;

  constructor(private sound: JapaneseSound) {
    this.romajiPattern = this.decisionRomajiPattern();
  }

  public getRomajiPattern(): RomajiPattern {
    return this.romajiPattern;
  }

  private decisionRomajiPattern(): RomajiPattern {
    if (this.sound instanceof Other) {
      const item = otherConvertList[this.sound.getHiragana()];
      if (!item) {
        throw new Error(
          "Romaji decisionRomajiPattern: 対象ひらがなに対応するローマ字が見つかりません"
        );
      }
      return item;
    }

    //
    return otherConvertList["あ"];
  }

  static fromSoundsOther(other: Other): Romaji {
    return new this(other);
  }
}
