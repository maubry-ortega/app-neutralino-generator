import Phaser from "phaser";
import { IsoScene } from "./game/IsoScene";
import { SeedManager } from "./utils/SeedManager";

const startGame = (seed) => {
  const config = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 800,
    height: 600,
    backgroundColor: "#2d2d2d",
    scene: new IsoScene(seed)
  };
  new Phaser.Game(config);
};

document.getElementById("start-btn").addEventListener("click", () => {
  const seed = document.getElementById("seed-input").value || new SeedManager().getSeed();
  startGame(seed);
});
