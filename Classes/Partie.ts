import De from "./Des";
import Gobelet from "./Gobelet";
import Joueur from "./Joueur";

export default class Game {
  private _nombreDeTours!: number;
  private _joueurs: Joueur[] = [];
  private _gobelet!: Gobelet;

  /**
   * Ici je détermine le nombre de joueurs, qui doit me donner
   * mon nombre de tours et de dés dans le gobelet
   * @param joueurs
   */
  private ajoutJoueurs(...joueurs: Joueur[]) {
    joueurs.forEach((joueurs) => this._joueurs.push(joueurs));
  }

  private nbDes() {
    this._gobelet = new Gobelet();
    for (let index = 0; index < this._joueurs.length; index++) {
      this._gobelet.ajoutDes(new De());
    }
  }

  private nbTours() {
    this._nombreDeTours = this._joueurs.length + 1;
  }

  public commenceJeu(...joueurs: Joueur[]) {
    this.ajoutJoueurs(...joueurs);
    this.nbTours();
    this.nbDes();
  }

  /**
   * Chaque joueur lance les dés du gobelet et met à jour son score
      */
  public commenceTour() {
    this._joueurs.forEach((Joueur) => {
      Joueur.lanceTour(this._gobelet);
    });
  }

  /**
   * On détermine le gagnant et regarde si il n'y a pas d'égalités
   * @returns le gagant du tour, 
   * et déclenche de nouveaux tours éventuels entre les ex-aequo   * 
   */
  private gagnantDuTour(): Joueur {
    //On attribue arbitrairement le premier joueur comme gagnant afin de pouvoir faire les comparaisons
    let gagnant: Joueur = this._joueurs[0];
    // On parcours la liste de joueurs
    this._joueurs.forEach((Joueur) => {
      if (Joueur.score > gagnant.score) {
        gagnant = Joueur;
      } else if (Joueur.score === gagnant.score && Joueur.nom !== gagnant.nom) {
        gagnant = this.relanceTour(gagnant, Joueur);
        this.gagnantDuTour();
      }
    });
    return gagnant;
  }

  /**
   * Cette méthode affiche les scores entre joueurs
   * @param Marcel 
   * @param Toto 
   * @returns les résultats
   * en indique dans la console les relances éventuelles
   */
  private relanceTour(Marcel: Joueur, Toto: Joueur) {
    console.log(`Relance entre ${Marcel.nom} et ${Toto.nom} : \n`);
    Marcel.lanceTour(this._gobelet);
    console.log(`\t Le score de ${Marcel.nom} est de  ${Marcel.score}.\n `);
    Toto.lanceTour(this._gobelet);
    console.log(`\t Le score de ${Toto.nom} est de ${Toto.score}.\n `);
    return Marcel.score > Toto.score ? Marcel : Toto;
  }

  private gagnantTour(winner: Joueur) {
    console.log(`\tLe Winner de ce tour est :  ${winner.nom} \r\n`);
  }

  private remonteScoreTour() {
    let gagnant: Joueur = this.gagnantDuTour();
    this.gagnantTour(gagnant);
    gagnant.miseAJourGagnant();
  }

  private TousLesScores() {
    this._joueurs.forEach((Joueur) => {
      console.log(`\t ${Joueur.nom} a gagné ${Joueur.gameScore} parties\r\n`);
    });
  }

  private ScoresTour() {
    this._joueurs.forEach((Joueur) => {
      console.log(
        `\r\t ${Joueur.nom} obtient ${Joueur.score} points !\r\n
        **************************************************\n`
      );
    });
  }

  /**
   *  La Méthode pour jouer
   */
  public jouePartie() {
    for (let index = 0; index < this._nombreDeTours; index++) {
      this.commenceTour();
      this.ScoresTour();
      this.remonteScoreTour();
    }
    this.TousLesScores();
    this.meilleurScore();
  }

  /**
   * Ici, je récupère le grand gagnant de la partie
   */
  public meilleurScore() {
    let gagnant: Joueur = this._joueurs[0];
    this._joueurs.forEach((Joueur) => {
      if (Joueur.gameScore > gagnant.gameScore) {
        gagnant = Joueur;
        console.log(
          `\t******************************\n\t\t
          And the Winner is : ${gagnant.nom}\n\t
           *******************************`
        );
      }
    });
  }
}
