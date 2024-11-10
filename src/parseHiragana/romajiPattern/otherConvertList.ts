import { RomajiPattern, RomajiPatternUnit, RomajiConvertList } from ".";

export const otherConvertList: RomajiConvertList = {
  あ: new RomajiPattern(new RomajiPatternUnit("a")),
  い: new RomajiPattern(new RomajiPatternUnit("i")),
  う: new RomajiPattern(new RomajiPatternUnit("u"), [
    new RomajiPatternUnit("wu"),
  ]),
  え: new RomajiPattern(new RomajiPatternUnit("e")),
  お: new RomajiPattern(new RomajiPatternUnit("o")),
  か: new RomajiPattern(new RomajiPatternUnit("ka"), [
    new RomajiPatternUnit("ca"),
  ]),
  き: new RomajiPattern(new RomajiPatternUnit("ki")),
  く: new RomajiPattern(new RomajiPatternUnit("ku")),
  け: new RomajiPattern(new RomajiPatternUnit("ke")),
  こ: new RomajiPattern(new RomajiPatternUnit("ko"), [
    new RomajiPatternUnit("co"),
  ]),
  さ: new RomajiPattern(new RomajiPatternUnit("sa")),
  し: new RomajiPattern(new RomajiPatternUnit("si"), [
    new RomajiPatternUnit("shi"),
    new RomajiPatternUnit("ci"),
  ]),
  す: new RomajiPattern(new RomajiPatternUnit("su")),
  せ: new RomajiPattern(new RomajiPatternUnit("se"), [
    new RomajiPatternUnit("ce"),
  ]),
  そ: new RomajiPattern(new RomajiPatternUnit("so")),
  た: new RomajiPattern(new RomajiPatternUnit("ta")),
  ち: new RomajiPattern(new RomajiPatternUnit("ti"), [
    new RomajiPatternUnit("chi"),
  ]),
  つ: new RomajiPattern(new RomajiPatternUnit("tu"), [
    new RomajiPatternUnit("tsu"),
  ]),
  て: new RomajiPattern(new RomajiPatternUnit("te")),
  と: new RomajiPattern(new RomajiPatternUnit("to")),
  な: new RomajiPattern(new RomajiPatternUnit("na")),
  に: new RomajiPattern(new RomajiPatternUnit("ni")),
  ぬ: new RomajiPattern(new RomajiPatternUnit("nu")),
  ね: new RomajiPattern(new RomajiPatternUnit("ne")),
  の: new RomajiPattern(new RomajiPatternUnit("no")),
  は: new RomajiPattern(new RomajiPatternUnit("ha")),
  ひ: new RomajiPattern(new RomajiPatternUnit("hi")),
  ふ: new RomajiPattern(new RomajiPatternUnit("fu"), [
    new RomajiPatternUnit("hu"),
  ]),
  へ: new RomajiPattern(new RomajiPatternUnit("he")),
  ほ: new RomajiPattern(new RomajiPatternUnit("ho")),
  ま: new RomajiPattern(new RomajiPatternUnit("ma")),
  み: new RomajiPattern(new RomajiPatternUnit("mi")),
  む: new RomajiPattern(new RomajiPatternUnit("mu")),
  め: new RomajiPattern(new RomajiPatternUnit("me")),
  も: new RomajiPattern(new RomajiPatternUnit("mo")),
  や: new RomajiPattern(new RomajiPatternUnit("ya")),
  ゆ: new RomajiPattern(new RomajiPatternUnit("yu")),
  よ: new RomajiPattern(new RomajiPatternUnit("yo")),
  ら: new RomajiPattern(new RomajiPatternUnit("ra")),
  り: new RomajiPattern(new RomajiPatternUnit("ri")),
  る: new RomajiPattern(new RomajiPatternUnit("ru")),
  れ: new RomajiPattern(new RomajiPatternUnit("re")),
  ろ: new RomajiPattern(new RomajiPatternUnit("ro")),
  わ: new RomajiPattern(new RomajiPatternUnit("wa")),
  を: new RomajiPattern(new RomajiPatternUnit("wo")),
  ん: new RomajiPattern(new RomajiPatternUnit("nn"), [
    new RomajiPatternUnit("xn"),
  ]),
  が: new RomajiPattern(new RomajiPatternUnit("ga")),
  ぎ: new RomajiPattern(new RomajiPatternUnit("gi")),
  ぐ: new RomajiPattern(new RomajiPatternUnit("gu")),
  げ: new RomajiPattern(new RomajiPatternUnit("ge")),
  ご: new RomajiPattern(new RomajiPatternUnit("go")),
  ざ: new RomajiPattern(new RomajiPatternUnit("za")),
  じ: new RomajiPattern(new RomajiPatternUnit("zi"), [
    new RomajiPatternUnit("ji"),
  ]),
  ず: new RomajiPattern(new RomajiPatternUnit("zu")),
  ぜ: new RomajiPattern(new RomajiPatternUnit("ze")),
  ぞ: new RomajiPattern(new RomajiPatternUnit("zo")),
  だ: new RomajiPattern(new RomajiPatternUnit("da")),
  ぢ: new RomajiPattern(new RomajiPatternUnit("di")),
  づ: new RomajiPattern(new RomajiPatternUnit("du")),
  で: new RomajiPattern(new RomajiPatternUnit("de")),
  ど: new RomajiPattern(new RomajiPatternUnit("do")),
  ば: new RomajiPattern(new RomajiPatternUnit("ba")),
  び: new RomajiPattern(new RomajiPatternUnit("bi")),
  ぶ: new RomajiPattern(new RomajiPatternUnit("bu")),
  べ: new RomajiPattern(new RomajiPatternUnit("be")),
  ぼ: new RomajiPattern(new RomajiPatternUnit("bo")),
  ぱ: new RomajiPattern(new RomajiPatternUnit("pa")),
  ぴ: new RomajiPattern(new RomajiPatternUnit("pi")),
  ぷ: new RomajiPattern(new RomajiPatternUnit("pu")),
  ぺ: new RomajiPattern(new RomajiPatternUnit("pe")),
  ぽ: new RomajiPattern(new RomajiPatternUnit("po")),
  ぁ: new RomajiPattern(new RomajiPatternUnit("la"), [
    new RomajiPatternUnit("xa"),
  ]),
  ぃ: new RomajiPattern(new RomajiPatternUnit("li"), [
    new RomajiPatternUnit("xi"),
  ]),
  ぅ: new RomajiPattern(new RomajiPatternUnit("lu"), [
    new RomajiPatternUnit("xu"),
  ]),
  ぇ: new RomajiPattern(new RomajiPatternUnit("le"), [
    new RomajiPatternUnit("xe"),
  ]),
  ぉ: new RomajiPattern(new RomajiPatternUnit("lo"), [
    new RomajiPatternUnit("xo"),
  ]),
  ゃ: new RomajiPattern(new RomajiPatternUnit("lya"), [
    new RomajiPatternUnit("xya"),
  ]),
  ゅ: new RomajiPattern(new RomajiPatternUnit("lyu"), [
    new RomajiPatternUnit("xyu"),
  ]),
  ょ: new RomajiPattern(new RomajiPatternUnit("lyo"), [
    new RomajiPatternUnit("xyo"),
  ]),
  ゎ: new RomajiPattern(new RomajiPatternUnit("lwa"), [
    new RomajiPatternUnit("xwu"),
  ]),
  っ: new RomajiPattern(new RomajiPatternUnit("ltu"), [
    new RomajiPatternUnit("xtu"),
  ]),
  ゐ: new RomajiPattern(new RomajiPatternUnit("i"), [
    new RomajiPatternUnit("wyi"),
  ]),
  ゑ: new RomajiPattern(new RomajiPatternUnit("e"), [
    new RomajiPatternUnit("wye"),
  ]),
  ヴ: {
    main: new RomajiPatternUnit("vu"),
  },
};
