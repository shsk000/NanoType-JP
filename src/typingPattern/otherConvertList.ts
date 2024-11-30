import { TypingPattern, TypingPatternUnit, RomajiConvertList } from ".";

export const otherConvertList: RomajiConvertList = {
  あ: new TypingPattern(new TypingPatternUnit("a")),
  い: new TypingPattern(new TypingPatternUnit("i")),
  う: new TypingPattern(new TypingPatternUnit("u"), [
    new TypingPatternUnit("wu"),
  ]),
  え: new TypingPattern(new TypingPatternUnit("e")),
  お: new TypingPattern(new TypingPatternUnit("o")),
  か: new TypingPattern(new TypingPatternUnit("ka"), [
    new TypingPatternUnit("ca"),
  ]),
  き: new TypingPattern(new TypingPatternUnit("ki")),
  く: new TypingPattern(new TypingPatternUnit("ku")),
  け: new TypingPattern(new TypingPatternUnit("ke")),
  こ: new TypingPattern(new TypingPatternUnit("ko"), [
    new TypingPatternUnit("co"),
  ]),
  さ: new TypingPattern(new TypingPatternUnit("sa")),
  し: new TypingPattern(new TypingPatternUnit("si"), [
    new TypingPatternUnit("shi"),
    new TypingPatternUnit("ci"),
  ]),
  す: new TypingPattern(new TypingPatternUnit("su")),
  せ: new TypingPattern(new TypingPatternUnit("se"), [
    new TypingPatternUnit("ce"),
  ]),
  そ: new TypingPattern(new TypingPatternUnit("so")),
  た: new TypingPattern(new TypingPatternUnit("ta")),
  ち: new TypingPattern(new TypingPatternUnit("ti"), [
    new TypingPatternUnit("chi"),
  ]),
  つ: new TypingPattern(new TypingPatternUnit("tu"), [
    new TypingPatternUnit("tsu"),
  ]),
  て: new TypingPattern(new TypingPatternUnit("te")),
  と: new TypingPattern(new TypingPatternUnit("to")),
  な: new TypingPattern(new TypingPatternUnit("na")),
  に: new TypingPattern(new TypingPatternUnit("ni")),
  ぬ: new TypingPattern(new TypingPatternUnit("nu")),
  ね: new TypingPattern(new TypingPatternUnit("ne")),
  の: new TypingPattern(new TypingPatternUnit("no")),
  は: new TypingPattern(new TypingPatternUnit("ha")),
  ひ: new TypingPattern(new TypingPatternUnit("hi")),
  ふ: new TypingPattern(new TypingPatternUnit("fu"), [
    new TypingPatternUnit("hu"),
  ]),
  へ: new TypingPattern(new TypingPatternUnit("he")),
  ほ: new TypingPattern(new TypingPatternUnit("ho")),
  ま: new TypingPattern(new TypingPatternUnit("ma")),
  み: new TypingPattern(new TypingPatternUnit("mi")),
  む: new TypingPattern(new TypingPatternUnit("mu")),
  め: new TypingPattern(new TypingPatternUnit("me")),
  も: new TypingPattern(new TypingPatternUnit("mo")),
  や: new TypingPattern(new TypingPatternUnit("ya")),
  ゆ: new TypingPattern(new TypingPatternUnit("yu")),
  よ: new TypingPattern(new TypingPatternUnit("yo")),
  ら: new TypingPattern(new TypingPatternUnit("ra")),
  り: new TypingPattern(new TypingPatternUnit("ri")),
  る: new TypingPattern(new TypingPatternUnit("ru")),
  れ: new TypingPattern(new TypingPatternUnit("re")),
  ろ: new TypingPattern(new TypingPatternUnit("ro")),
  わ: new TypingPattern(new TypingPatternUnit("wa")),
  を: new TypingPattern(new TypingPatternUnit("wo")),
  ん: new TypingPattern(new TypingPatternUnit("nn"), [
    new TypingPatternUnit("xn"),
  ]),
  が: new TypingPattern(new TypingPatternUnit("ga")),
  ぎ: new TypingPattern(new TypingPatternUnit("gi")),
  ぐ: new TypingPattern(new TypingPatternUnit("gu")),
  げ: new TypingPattern(new TypingPatternUnit("ge")),
  ご: new TypingPattern(new TypingPatternUnit("go")),
  ざ: new TypingPattern(new TypingPatternUnit("za")),
  じ: new TypingPattern(new TypingPatternUnit("zi"), [
    new TypingPatternUnit("ji"),
  ]),
  ず: new TypingPattern(new TypingPatternUnit("zu")),
  ぜ: new TypingPattern(new TypingPatternUnit("ze")),
  ぞ: new TypingPattern(new TypingPatternUnit("zo")),
  だ: new TypingPattern(new TypingPatternUnit("da")),
  ぢ: new TypingPattern(new TypingPatternUnit("di")),
  づ: new TypingPattern(new TypingPatternUnit("du")),
  で: new TypingPattern(new TypingPatternUnit("de")),
  ど: new TypingPattern(new TypingPatternUnit("do")),
  ば: new TypingPattern(new TypingPatternUnit("ba")),
  び: new TypingPattern(new TypingPatternUnit("bi")),
  ぶ: new TypingPattern(new TypingPatternUnit("bu")),
  べ: new TypingPattern(new TypingPatternUnit("be")),
  ぼ: new TypingPattern(new TypingPatternUnit("bo")),
  ぱ: new TypingPattern(new TypingPatternUnit("pa")),
  ぴ: new TypingPattern(new TypingPatternUnit("pi")),
  ぷ: new TypingPattern(new TypingPatternUnit("pu")),
  ぺ: new TypingPattern(new TypingPatternUnit("pe")),
  ぽ: new TypingPattern(new TypingPatternUnit("po")),
  ぁ: new TypingPattern(new TypingPatternUnit("la"), [
    new TypingPatternUnit("xa"),
  ]),
  ぃ: new TypingPattern(new TypingPatternUnit("li"), [
    new TypingPatternUnit("xi"),
  ]),
  ぅ: new TypingPattern(new TypingPatternUnit("lu"), [
    new TypingPatternUnit("xu"),
  ]),
  ぇ: new TypingPattern(new TypingPatternUnit("le"), [
    new TypingPatternUnit("xe"),
  ]),
  ぉ: new TypingPattern(new TypingPatternUnit("lo"), [
    new TypingPatternUnit("xo"),
  ]),
  ゃ: new TypingPattern(new TypingPatternUnit("lya"), [
    new TypingPatternUnit("xya"),
  ]),
  ゅ: new TypingPattern(new TypingPatternUnit("lyu"), [
    new TypingPatternUnit("xyu"),
  ]),
  ょ: new TypingPattern(new TypingPatternUnit("lyo"), [
    new TypingPatternUnit("xyo"),
  ]),
  ゎ: new TypingPattern(new TypingPatternUnit("lwa"), [
    new TypingPatternUnit("xwu"),
  ]),
  っ: new TypingPattern(new TypingPatternUnit("ltu"), [
    new TypingPatternUnit("xtu"),
  ]),
  ゐ: new TypingPattern(new TypingPatternUnit("i"), [
    new TypingPatternUnit("wyi"),
  ]),
  ゑ: new TypingPattern(new TypingPatternUnit("e"), [
    new TypingPatternUnit("wye"),
  ]),
  ヴ: new TypingPattern(new TypingPatternUnit("vu")),
};
