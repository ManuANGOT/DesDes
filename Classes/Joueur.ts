import Gobelet from "./Gobelet";

export default class Player {
  private _nom: string;
  private _score: number = 0;
  private _gameScore: number = 0;

  constructor(name: string) {
    this._nom = name;
  }

  get score() {
    return this._score;
  }

  get gameScore() {
    return this._gameScore;
  }

  public miseAJourGagnant() {
    this._gameScore += 1;
    this._score = 0;
  }

  get nom() {
    return this._nom;
  }

  lanceTour(gobelet: Gobelet) {
    gobelet.lanceTour();
    console.log(gobelet.values);
    this._score = gobelet.value;
  }
}
