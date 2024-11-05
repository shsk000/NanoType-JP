import { Other } from "../japaneseSounds/other";
import { JapaneseSound } from "../japaneseSounds/type";
import { otherConvertList } from "./convert";
import { HiraganaRomajiItem } from "./type";

export class Romaji {
  private hiragana: string;
  private romajiItem: HiraganaRomajiItem;

  constructor(private sound: JapaneseSound) {
    this.hiragana = sound.getHiragana();
    this.romajiItem = this.decisionRomajiItem(this.sound);
  }

  public getRomajiItem(): HiraganaRomajiItem {
    return this.romajiItem;
  }

  private decisionRomajiItem(sound: JapaneseSound): HiraganaRomajiItem {
    if (sound instanceof Other) {
      const item = otherConvertList[this.hiragana];
      return item;
    }

    //
    return otherConvertList["あ"];
  }

  static fromSoundsOther(other: Other): Romaji {
    return new this(other);
  }
}
