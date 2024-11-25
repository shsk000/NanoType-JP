export const fullWidthToHalfWidth = (sentence: string) => {
  return sentence.replace(
    /[！”＃＄％＆’（）＝～｜｛｝‘＊＋＿？＜＞、。￥；：」ー「＠＾－　]/g,
    (s) => {
      switch (s) {
        case "”":
          return '"';
        case "’":
          return "'";
        case "‘":
          return "'";
        case "、":
          return ",";
        case "。":
          return ".";
        case "￥":
          return "\\";
        case "「":
          return "[";
        case "」":
          return "]";
        case "ー":
          return "-";
        case "　":
          return " ";
        default:
          return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      }
    }
  );
};
