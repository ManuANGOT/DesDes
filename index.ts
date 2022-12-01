import Game from "./Classes/Partie";
import Joueur from "./Classes/Joueur";

const joueur1: Joueur  = new Joueur('Marcel');
const joueur2: Joueur  = new Joueur('Bernard');
const joueur3: Joueur  = new Joueur('Manu');

const game: Game = new Game();

game.commenceJeu(joueur1, joueur2, joueur3);
game.jouePartie();