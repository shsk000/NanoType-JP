// NOTE: otherConvertList を参照するため、index経由ではなく直接importする
//       （index経由だとモジュールの評価順で undefined になる）
import { TypingPattern, TypingPatternUnit } from "./typingPattern";
import { otherConvertList } from "./otherConvertList";
import { RomajiConvertList } from "./type";

/**
 * 「大きい文字」と「小さい文字」を一文字ずつ入力するパターンを生成する
 * 例: ふ(fu, hu) + ぇ(le, xe) => fule, fuxe, hule, huxe
 */
const splitInputUnits = (large: string, small: string): TypingPatternUnit[] => {
  const largePattern = otherConvertList[large];
  const smallPattern = otherConvertList[small];

  if (!largePattern || !smallPattern) {
    throw new Error(
      `youonConvertList: 変換情報が見つかりません. large: ${large}, small: ${small}`
    );
  }

  return TypingPattern.concatFieldCombinations(
    largePattern,
    smallPattern
  ).getFlatTypingPatternUnits();
};

export const youonConvertList: RomajiConvertList = {
  きゃ: new TypingPattern(new TypingPatternUnit("kya"), [
    new TypingPatternUnit("kilya"),
    new TypingPatternUnit("kixya"),
  ]),
  きぃ: new TypingPattern(new TypingPatternUnit("kyi"), [
    new TypingPatternUnit("kili"),
    new TypingPatternUnit("kixi"),
  ]),
  きゅ: new TypingPattern(new TypingPatternUnit("kyu"), [
    new TypingPatternUnit("kilyu"),
    new TypingPatternUnit("kixyu"),
  ]),
  きぇ: new TypingPattern(new TypingPatternUnit("kye"), [
    new TypingPatternUnit("kile"),
    new TypingPatternUnit("kixe"),
  ]),
  きょ: new TypingPattern(new TypingPatternUnit("kyo"), [
    new TypingPatternUnit("kilyo"),
    new TypingPatternUnit("kixyo"),
  ]),

  しゃ: new TypingPattern(new TypingPatternUnit("sya"), [
    new TypingPatternUnit("sha"),
    new TypingPatternUnit("silya"),
    new TypingPatternUnit("sixya"),
    new TypingPatternUnit("shilya"),
    new TypingPatternUnit("shixya"),
  ]),
  // NOTE:「shi」は「し」のため、「しぃ」の入力パターンには含めない
  しぃ: new TypingPattern(new TypingPatternUnit("syi"), [
    new TypingPatternUnit("sili"),
    new TypingPatternUnit("sixi"),
    new TypingPatternUnit("shili"),
    new TypingPatternUnit("shixi"),
  ]),
  しゅ: new TypingPattern(new TypingPatternUnit("syu"), [
    new TypingPatternUnit("shu"),
    new TypingPatternUnit("silyu"),
    new TypingPatternUnit("sixyu"),
    new TypingPatternUnit("shilyu"),
    new TypingPatternUnit("shixyu"),
  ]),
  しぇ: new TypingPattern(new TypingPatternUnit("sye"), [
    new TypingPatternUnit("she"),
    new TypingPatternUnit("sile"),
    new TypingPatternUnit("sixe"),
    new TypingPatternUnit("shile"),
    new TypingPatternUnit("shixe"),
  ]),
  しょ: new TypingPattern(new TypingPatternUnit("syo"), [
    new TypingPatternUnit("sho"),
    new TypingPatternUnit("silyo"),
    new TypingPatternUnit("sixyo"),
    new TypingPatternUnit("shilyo"),
    new TypingPatternUnit("shixyo"),
  ]),

  ちゃ: new TypingPattern(new TypingPatternUnit("tya"), [
    new TypingPatternUnit("cha"),
    new TypingPatternUnit("chilya"),
    new TypingPatternUnit("chixya"),
  ]),
  // NOTE:「chi」は「ち」のため、「ちぃ」の入力パターンには含めない
  ちぃ: new TypingPattern(new TypingPatternUnit("tyi"), [
    new TypingPatternUnit("chili"),
    new TypingPatternUnit("chixi"),
  ]),
  ちゅ: new TypingPattern(new TypingPatternUnit("tyu"), [
    new TypingPatternUnit("chu"),
    new TypingPatternUnit("chilyu"),
    new TypingPatternUnit("chixyu"),
  ]),
  ちぇ: new TypingPattern(new TypingPatternUnit("tye"), [
    new TypingPatternUnit("che"),
    new TypingPatternUnit("chile"),
    new TypingPatternUnit("chixe"),
  ]),
  ちょ: new TypingPattern(new TypingPatternUnit("tyo"), [
    new TypingPatternUnit("cho"),
    new TypingPatternUnit("chilyo"),
    new TypingPatternUnit("chixyo"),
  ]),

  てゃ: new TypingPattern(new TypingPatternUnit("tha"), [
    new TypingPatternUnit("telya"),
    new TypingPatternUnit("texya"),
  ]),
  てぃ: new TypingPattern(new TypingPatternUnit("thi"), [
    new TypingPatternUnit("teli"),
    new TypingPatternUnit("texi"),
  ]),
  てゅ: new TypingPattern(new TypingPatternUnit("thu"), [
    new TypingPatternUnit("telyu"),
    new TypingPatternUnit("texyu"),
  ]),
  てぇ: new TypingPattern(new TypingPatternUnit("the"), [
    new TypingPatternUnit("tele"),
    new TypingPatternUnit("texe"),
  ]),
  てょ: new TypingPattern(new TypingPatternUnit("tho"), [
    new TypingPatternUnit("telyo"),
    new TypingPatternUnit("texyo"),
  ]),

  にゃ: new TypingPattern(new TypingPatternUnit("nya"), [
    new TypingPatternUnit("nilya"),
    new TypingPatternUnit("nixya"),
  ]),
  にぃ: new TypingPattern(new TypingPatternUnit("nyi"), [
    new TypingPatternUnit("nili"),
    new TypingPatternUnit("nixi"),
  ]),
  にゅ: new TypingPattern(new TypingPatternUnit("nyu"), [
    new TypingPatternUnit("nilyu"),
    new TypingPatternUnit("nixyu"),
  ]),
  にぇ: new TypingPattern(new TypingPatternUnit("nye"), [
    new TypingPatternUnit("nile"),
    new TypingPatternUnit("nixe"),
  ]),
  にょ: new TypingPattern(new TypingPatternUnit("nyo"), [
    new TypingPatternUnit("nilyo"),
    new TypingPatternUnit("nixyo"),
  ]),

  ひゃ: new TypingPattern(new TypingPatternUnit("hya"), [
    new TypingPatternUnit("hilya"),
    new TypingPatternUnit("hixya"),
  ]),
  ひぃ: new TypingPattern(new TypingPatternUnit("hyi"), [
    new TypingPatternUnit("hili"),
    new TypingPatternUnit("hixi"),
  ]),
  ひゅ: new TypingPattern(new TypingPatternUnit("hyu"), [
    new TypingPatternUnit("hilyu"),
    new TypingPatternUnit("hixyu"),
  ]),
  ひぇ: new TypingPattern(new TypingPatternUnit("hye"), [
    new TypingPatternUnit("hile"),
    new TypingPatternUnit("hixe"),
  ]),
  ひょ: new TypingPattern(new TypingPatternUnit("hyo"), [
    new TypingPatternUnit("hilyo"),
    new TypingPatternUnit("hixyo"),
  ]),

  みゃ: new TypingPattern(new TypingPatternUnit("mya"), [
    new TypingPatternUnit("milya"),
    new TypingPatternUnit("mixya"),
  ]),
  みぃ: new TypingPattern(new TypingPatternUnit("myi"), [
    new TypingPatternUnit("mili"),
    new TypingPatternUnit("mixi"),
  ]),
  みゅ: new TypingPattern(new TypingPatternUnit("myu"), [
    new TypingPatternUnit("milyu"),
    new TypingPatternUnit("mixyu"),
  ]),
  みぇ: new TypingPattern(new TypingPatternUnit("mye"), [
    new TypingPatternUnit("mile"),
    new TypingPatternUnit("mixe"),
  ]),
  みょ: new TypingPattern(new TypingPatternUnit("myo"), [
    new TypingPatternUnit("milyo"),
    new TypingPatternUnit("mixyo"),
  ]),

  りゃ: new TypingPattern(new TypingPatternUnit("rya"), [
    new TypingPatternUnit("rilya"),
    new TypingPatternUnit("rixya"),
  ]),
  りぃ: new TypingPattern(new TypingPatternUnit("ryi"), [
    new TypingPatternUnit("rili"),
    new TypingPatternUnit("rixi"),
  ]),
  りゅ: new TypingPattern(new TypingPatternUnit("ryu"), [
    new TypingPatternUnit("rilyu"),
    new TypingPatternUnit("rixyu"),
  ]),
  りぇ: new TypingPattern(new TypingPatternUnit("rye"), [
    new TypingPatternUnit("rile"),
    new TypingPatternUnit("rixe"),
  ]),
  りょ: new TypingPattern(new TypingPatternUnit("ryo"), [
    new TypingPatternUnit("rilyo"),
    new TypingPatternUnit("rixyo"),
  ]),

  // NOTE:「ふ」は母音がuのため、分割入力は fu/hu 起点になる（fi起点では「ふぃ」+小文字になってしまう）
  ふぁ: new TypingPattern(new TypingPatternUnit("fa"), [
    new TypingPatternUnit("fwa"),
    new TypingPatternUnit("hwa"),
    ...splitInputUnits("ふ", "ぁ"),
  ]),
  ふぃ: new TypingPattern(new TypingPatternUnit("fi"), [
    new TypingPatternUnit("fyi"),
    new TypingPatternUnit("fwi"),
    new TypingPatternUnit("hwi"),
    ...splitInputUnits("ふ", "ぃ"),
  ]),
  ふぇ: new TypingPattern(new TypingPatternUnit("fe"), [
    new TypingPatternUnit("fye"),
    new TypingPatternUnit("fwe"),
    new TypingPatternUnit("hwe"),
    ...splitInputUnits("ふ", "ぇ"),
  ]),
  ふぉ: new TypingPattern(new TypingPatternUnit("fo"), [
    new TypingPatternUnit("fwo"),
    new TypingPatternUnit("hwo"),
    ...splitInputUnits("ふ", "ぉ"),
  ]),
  ふゃ: new TypingPattern(new TypingPatternUnit("fya"), [
    ...splitInputUnits("ふ", "ゃ"),
  ]),
  ふゅ: new TypingPattern(new TypingPatternUnit("fyu"), [
    ...splitInputUnits("ふ", "ゅ"),
  ]),
  ふょ: new TypingPattern(new TypingPatternUnit("fyo"), [
    ...splitInputUnits("ふ", "ょ"),
  ]),

  ぎゃ: new TypingPattern(new TypingPatternUnit("gya"), [
    new TypingPatternUnit("gilya"),
    new TypingPatternUnit("gixya"),
  ]),
  ぎぃ: new TypingPattern(new TypingPatternUnit("gyi"), [
    new TypingPatternUnit("gili"),
    new TypingPatternUnit("gixi"),
  ]),
  ぎゅ: new TypingPattern(new TypingPatternUnit("gyu"), [
    new TypingPatternUnit("gilyu"),
    new TypingPatternUnit("gixyu"),
  ]),
  ぎぇ: new TypingPattern(new TypingPatternUnit("gye"), [
    new TypingPatternUnit("gile"),
    new TypingPatternUnit("gixe"),
  ]),
  ぎょ: new TypingPattern(new TypingPatternUnit("gyo"), [
    new TypingPatternUnit("gilyo"),
    new TypingPatternUnit("gixyo"),
  ]),

  じゃ: new TypingPattern(new TypingPatternUnit("zya"), [
    new TypingPatternUnit("zilya"),
    new TypingPatternUnit("zixya"),
    new TypingPatternUnit("ja"),
    new TypingPatternUnit("jilya"),
    new TypingPatternUnit("jixya"),
  ]),
  // NOTE:「ji」は「じ」のため、「じぃ」の入力パターンには含めない
  じぃ: new TypingPattern(new TypingPatternUnit("zyi"), [
    new TypingPatternUnit("zili"),
    new TypingPatternUnit("zixi"),
    new TypingPatternUnit("jili"),
    new TypingPatternUnit("jixi"),
  ]),
  じゅ: new TypingPattern(new TypingPatternUnit("zyu"), [
    new TypingPatternUnit("zilyu"),
    new TypingPatternUnit("zixyu"),
    new TypingPatternUnit("ju"),
    new TypingPatternUnit("jilyu"),
    new TypingPatternUnit("jixyu"),
  ]),
  じぇ: new TypingPattern(new TypingPatternUnit("zye"), [
    new TypingPatternUnit("zile"),
    new TypingPatternUnit("zixe"),
    new TypingPatternUnit("je"),
    new TypingPatternUnit("jile"),
    new TypingPatternUnit("jixe"),
  ]),
  じょ: new TypingPattern(new TypingPatternUnit("zyo"), [
    new TypingPatternUnit("zilyo"),
    new TypingPatternUnit("zixyo"),
    new TypingPatternUnit("jo"),
    new TypingPatternUnit("jilyo"),
    new TypingPatternUnit("jixyo"),
  ]),

  ぢゃ: new TypingPattern(new TypingPatternUnit("dya"), [
    new TypingPatternUnit("dilya"),
    new TypingPatternUnit("dixya"),
  ]),
  ぢぃ: new TypingPattern(new TypingPatternUnit("dyi"), [
    new TypingPatternUnit("dili"),
    new TypingPatternUnit("dixi"),
  ]),
  ぢゅ: new TypingPattern(new TypingPatternUnit("dyu"), [
    new TypingPatternUnit("dilyu"),
    new TypingPatternUnit("dixyu"),
  ]),
  ぢぇ: new TypingPattern(new TypingPatternUnit("dye"), [
    new TypingPatternUnit("dile"),
    new TypingPatternUnit("dixe"),
  ]),
  ぢょ: new TypingPattern(new TypingPatternUnit("dyo"), [
    new TypingPatternUnit("dilyo"),
    new TypingPatternUnit("dixyo"),
  ]),

  でゃ: new TypingPattern(new TypingPatternUnit("dha"), [
    new TypingPatternUnit("delya"),
    new TypingPatternUnit("dexya"),
  ]),
  でぃ: new TypingPattern(new TypingPatternUnit("dhi"), [
    new TypingPatternUnit("deli"),
    new TypingPatternUnit("dexi"),
  ]),
  でゅ: new TypingPattern(new TypingPatternUnit("dhu"), [
    new TypingPatternUnit("delyu"),
    new TypingPatternUnit("dexyu"),
  ]),
  でぇ: new TypingPattern(new TypingPatternUnit("dhe"), [
    new TypingPatternUnit("dele"),
    new TypingPatternUnit("dexe"),
  ]),
  でょ: new TypingPattern(new TypingPatternUnit("dho"), [
    new TypingPatternUnit("delyo"),
    new TypingPatternUnit("dexyo"),
  ]),

  びゃ: new TypingPattern(new TypingPatternUnit("bya"), [
    new TypingPatternUnit("bilya"),
    new TypingPatternUnit("bixya"),
  ]),
  びぃ: new TypingPattern(new TypingPatternUnit("byi"), [
    new TypingPatternUnit("bili"),
    new TypingPatternUnit("bixi"),
  ]),
  びゅ: new TypingPattern(new TypingPatternUnit("byu"), [
    new TypingPatternUnit("bilyu"),
    new TypingPatternUnit("bixyu"),
  ]),
  びぇ: new TypingPattern(new TypingPatternUnit("bye"), [
    new TypingPatternUnit("bile"),
    new TypingPatternUnit("bixe"),
  ]),
  びょ: new TypingPattern(new TypingPatternUnit("byo"), [
    new TypingPatternUnit("bilyo"),
    new TypingPatternUnit("bixyo"),
  ]),

  ぴゃ: new TypingPattern(new TypingPatternUnit("pya"), [
    new TypingPatternUnit("pilya"),
    new TypingPatternUnit("pixya"),
  ]),
  ぴぃ: new TypingPattern(new TypingPatternUnit("pyi"), [
    new TypingPatternUnit("pili"),
    new TypingPatternUnit("pixi"),
  ]),
  ぴゅ: new TypingPattern(new TypingPatternUnit("pyu"), [
    new TypingPatternUnit("pilyu"),
    new TypingPatternUnit("pixyu"),
  ]),
  ぴぇ: new TypingPattern(new TypingPatternUnit("pye"), [
    new TypingPatternUnit("pile"),
    new TypingPatternUnit("pixe"),
  ]),
  ぴょ: new TypingPattern(new TypingPatternUnit("pyo"), [
    new TypingPatternUnit("pilyo"),
    new TypingPatternUnit("pixyo"),
  ]),

  // 以下、外来音（「ふ」行は上記の位置に定義している）

  いぇ: new TypingPattern(new TypingPatternUnit("ye"), [
    ...splitInputUnits("い", "ぇ"),
  ]),

  うぁ: new TypingPattern(new TypingPatternUnit("wha"), [
    ...splitInputUnits("う", "ぁ"),
  ]),
  // NOTE:「wo」は「を」のため、「うぉ」の入力パターンには含めない
  うぃ: new TypingPattern(new TypingPatternUnit("wi"), [
    new TypingPatternUnit("whi"),
    ...splitInputUnits("う", "ぃ"),
  ]),
  うぇ: new TypingPattern(new TypingPatternUnit("we"), [
    new TypingPatternUnit("whe"),
    ...splitInputUnits("う", "ぇ"),
  ]),
  うぉ: new TypingPattern(new TypingPatternUnit("who"), [
    ...splitInputUnits("う", "ぉ"),
  ]),

  ゔぁ: new TypingPattern(new TypingPatternUnit("va"), [
    ...splitInputUnits("ゔ", "ぁ"),
  ]),
  ゔぃ: new TypingPattern(new TypingPatternUnit("vi"), [
    new TypingPatternUnit("vyi"),
    ...splitInputUnits("ゔ", "ぃ"),
  ]),
  ゔぇ: new TypingPattern(new TypingPatternUnit("ve"), [
    new TypingPatternUnit("vye"),
    ...splitInputUnits("ゔ", "ぇ"),
  ]),
  ゔぉ: new TypingPattern(new TypingPatternUnit("vo"), [
    ...splitInputUnits("ゔ", "ぉ"),
  ]),
  ゔゃ: new TypingPattern(new TypingPatternUnit("vya"), [
    ...splitInputUnits("ゔ", "ゃ"),
  ]),
  ゔゅ: new TypingPattern(new TypingPatternUnit("vyu"), [
    ...splitInputUnits("ゔ", "ゅ"),
  ]),
  ゔょ: new TypingPattern(new TypingPatternUnit("vyo"), [
    ...splitInputUnits("ゔ", "ょ"),
  ]),

  くぁ: new TypingPattern(new TypingPatternUnit("qa"), [
    new TypingPatternUnit("kwa"),
    new TypingPatternUnit("qwa"),
    ...splitInputUnits("く", "ぁ"),
  ]),
  くぃ: new TypingPattern(new TypingPatternUnit("qi"), [
    new TypingPatternUnit("kwi"),
    new TypingPatternUnit("qwi"),
    new TypingPatternUnit("qyi"),
    ...splitInputUnits("く", "ぃ"),
  ]),
  くぇ: new TypingPattern(new TypingPatternUnit("qe"), [
    new TypingPatternUnit("kwe"),
    new TypingPatternUnit("qwe"),
    new TypingPatternUnit("qye"),
    ...splitInputUnits("く", "ぇ"),
  ]),
  くぉ: new TypingPattern(new TypingPatternUnit("qo"), [
    new TypingPatternUnit("kwo"),
    new TypingPatternUnit("qwo"),
    ...splitInputUnits("く", "ぉ"),
  ]),

  ぐぁ: new TypingPattern(new TypingPatternUnit("gwa"), [
    ...splitInputUnits("ぐ", "ぁ"),
  ]),
  ぐぃ: new TypingPattern(new TypingPatternUnit("gwi"), [
    ...splitInputUnits("ぐ", "ぃ"),
  ]),
  ぐぇ: new TypingPattern(new TypingPatternUnit("gwe"), [
    ...splitInputUnits("ぐ", "ぇ"),
  ]),
  ぐぉ: new TypingPattern(new TypingPatternUnit("gwo"), [
    ...splitInputUnits("ぐ", "ぉ"),
  ]),

  すぁ: new TypingPattern(new TypingPatternUnit("swa"), [
    ...splitInputUnits("す", "ぁ"),
  ]),
  すぃ: new TypingPattern(new TypingPatternUnit("swi"), [
    ...splitInputUnits("す", "ぃ"),
  ]),
  すぇ: new TypingPattern(new TypingPatternUnit("swe"), [
    ...splitInputUnits("す", "ぇ"),
  ]),
  すぉ: new TypingPattern(new TypingPatternUnit("swo"), [
    ...splitInputUnits("す", "ぉ"),
  ]),

  ずぁ: new TypingPattern(new TypingPatternUnit("zwa"), [
    ...splitInputUnits("ず", "ぁ"),
  ]),
  ずぃ: new TypingPattern(new TypingPatternUnit("zwi"), [
    ...splitInputUnits("ず", "ぃ"),
  ]),
  ずぇ: new TypingPattern(new TypingPatternUnit("zwe"), [
    ...splitInputUnits("ず", "ぇ"),
  ]),
  ずぉ: new TypingPattern(new TypingPatternUnit("zwo"), [
    ...splitInputUnits("ず", "ぉ"),
  ]),

  つぁ: new TypingPattern(new TypingPatternUnit("tsa"), [
    ...splitInputUnits("つ", "ぁ"),
  ]),
  つぃ: new TypingPattern(new TypingPatternUnit("tsi"), [
    ...splitInputUnits("つ", "ぃ"),
  ]),
  つぇ: new TypingPattern(new TypingPatternUnit("tse"), [
    ...splitInputUnits("つ", "ぇ"),
  ]),
  つぉ: new TypingPattern(new TypingPatternUnit("tso"), [
    ...splitInputUnits("つ", "ぉ"),
  ]),

  とぅ: new TypingPattern(new TypingPatternUnit("twu"), [
    ...splitInputUnits("と", "ぅ"),
  ]),
  どぅ: new TypingPattern(new TypingPatternUnit("dwu"), [
    ...splitInputUnits("ど", "ぅ"),
  ]),
};
