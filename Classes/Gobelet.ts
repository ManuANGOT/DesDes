import Des from "./Des";
export default class Gobelet {
  private _value: number = 0;
  private _des: Des[] = [];

  /**
   * Je peux rajouter des dés
   */
  public ajoutDes(des: Des) {
    this._des.push(des);
  }
  
  /**
   * Méthode pour récupérer la valeur du gobelet"
   *
   */
  public get values() {
    return this._des.map((des) => des.value);
  }
  public get value() {
    return this._value;
  }

  /**
   * Je lance le tour en vidant mon gobelet ;)
   *   */
  public lanceTour() {
    this._value = 0;
    this._des.forEach((des) => {
    this._value += des.lanceDes();
    });
  }
}
