/** @format */

import Map from "./map.js";
import Weapon from "./weapon.js";
import Weapons from "../assets/weapons.js";
import Player from "./player.js";
import BattleLogic from "./battleLogic.js";

class Game {
  constructor() {
    const mapSize = 15;
    const numberOfRocks = 20;
    // 4 Weapons
    // 2 Players
    this.currentTurn = 0;
    this.playerTurn = 0;

    this.BattleLogic = new BattleLogic();
    this.map = new Map(mapSize, numberOfRocks, this);
  }

  init() {
    this.setupEventListeners();
    console.log("Game start");
    this.map.init();
    this.researchPhase();
  }

  setupEventListeners() {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("reachable-cell")) {
        this.map.updatePlayerCoordinates(event.srcElement.attributes[0].value);
        this.researchPhase();
      }
      if (event.target.classList.contains("replay")) {
        location.reload();
      }
    });
  }

  researchPhase() {
    this.updateTurnInfo();
    this.updatePlayersInfo();

    this.map.displayReachableCases(
      this.map.area,
      this.map.Players[this.playerTurn - 1]
    );
  }

  updateTurnInfo() {
    const htmlPlayerTurn = document.querySelector(".player-turn");
    const htmlPlayerColor = document.querySelector("#player-color");
    let color;

    if (this.playerTurn == 1) {
      this.playerTurn = 2;
      color = "red";
    } else {
      this.currentTurn++;
      this.playerTurn = 1;
      color = "blue";
    }

    htmlPlayerTurn.innerHTML = this.playerTurn;
    htmlPlayerColor.className = color;
  }

  updatePlayersInfo() {
    const hpPlayer1 = document.querySelector(".hp-player1");
    const hpPlayer2 = document.querySelector(".hp-player2");
    const atkPlayer1 = document.querySelector(".atk-player1");
    const atkPlayer2 = document.querySelector(".atk-player2");
    const defPlayer1 = document.querySelector(".def-player1");
    const defPlayer2 = document.querySelector(".def-player2");

    hpPlayer1.innerHTML = this.map.Players[0].health;
    hpPlayer2.innerHTML = this.map.Players[1].health;
    atkPlayer1.innerHTML = this.map.Players[0].power;
    atkPlayer2.innerHTML = this.map.Players[1].power;
    defPlayer1.innerHTML = this.map.Players[0].defense;
    defPlayer2.innerHTML = this.map.Players[1].defense;
  }

  battlePhase() {
    console.log("Battle Phase");
    this.displayActions();
  }

  displayActions() {
    this.updateTurnInfo();
    const actions = document.querySelector(".battle-ui");
    actions.style.display = "block";
    this.setupBattleListeners();
  }

  setupBattleListeners() {
    document.addEventListener("click", (event) => {
      let playingPlayer;
      let waitingPlayer;

      if (this.playerTurn == 1) {
        playingPlayer = 0;
        waitingPlayer = 1;
      } else {
        playingPlayer = 1;
        waitingPlayer = 0;
      }

      if (event.target.classList.contains("attack")) {
        const targetIsDead = this.BattleLogic.attack(
          this.map.Players[playingPlayer],
          this.map.Players[waitingPlayer]
        );
        this.battleTurn(targetIsDead);
      }
      if (event.target.classList.contains("defend")) {
        this.BattleLogic.defend(this.map.Players[playingPlayer]);
        this.battleTurn();
      }
    });
  }

  battleTurn(targetIsDead) {
    this.updatePlayersInfo();
    this.updateTurnInfo();
    if (targetIsDead) {
      this.displayWinScreen();
    }
  }

  displayWinScreen() {
    console.log("GG");
    const finalScreen = document.querySelector(".final");
    const winner = document.querySelector(".winner");
    const actions = document.querySelector(".battle-ui");
    actions.style.display = "none";
    finalScreen.style.display = "block";

    if (this.playerTurn == 1) {
      winner.innerHTML = "2";
    } else {
      winner.innerHTML = "1";
    }
  }
}

export default Game;
