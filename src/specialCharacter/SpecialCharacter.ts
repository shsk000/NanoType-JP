export class SpecialCharacter {
  constructor(public character: string) {
    if (!SpecialCharacter.isSpecialCharacter(character)) {
      throw new Error("Invalid special character");
    }
  }

  static isSpecialCharacter(character: string): boolean {
    return /[!"#$%&'()=~\|\{\}\*_\?<>,.;:\"\-@^+\\\]\[]/.test(character);
  }
}
