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
    for (let i = 0; i < this._joueurs.length; i++) {
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

 private commenceTour() {
    this._joueurs.forEach((Joueur) => {
      Joueur.lanceTour(this._gobelet);
    });
  }

 

  private gagnantDuTour(): Joueur {
    let gagnant: Joueur = this._joueurs[0];
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

  private relanceTour(Marcel: Joueur, Toto: Joueur) {
    console.log(`Relance entre ${Marcel.nom} et ${Toto.nom} : \n`);
    Marcel.lanceTour(this._gobelet);
    console.log(`\t Le score de ${Marcel.nom} est de  ${Marcel.score}.\n `);
    Toto.lanceTour(this._gobelet);
    console.log(`\t Le score de ${Toto.nom} est de ${Toto.score}.\n `);
    return Marcel.score > Toto.score ? Marcel : Toto;
  }

  private gagnantTour(winner: Joueur) {
    console.log(`Le Winner de ce tour est :  ${winner.nom} \r\n`);
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
      console.log(`\t ${Joueur.nom} a fait ${Joueur.score}`);
    });
  }

  /**
   *  La Méthode pour jouer
   *
   */
  public jouePartie() {
    for (let i = 0; i < this._nombreDeTours; i++) {
      this.commenceTour();
      this.ScoresTour();
      this.remonteScoreTour();
    }
    this.TousLesScores();
    this.meilleurScore();
  }

  /**
   * Ici, je récupère le grand gagnant de la partie
   *
   */
  private meilleurScore() {
    let gagnant: Joueur = this._joueurs[0];
    this._joueurs.forEach((Joueur) => {
      if (Joueur.gameScore > gagnant.gameScore) {
        gagnant = Joueur;
        console.log(
          `*******************************\n And the Winner is : ${gagnant.nom}\n *******************************`
        );
      }
    });
  }
}
