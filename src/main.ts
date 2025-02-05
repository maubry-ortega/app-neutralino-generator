import Phaser from "phaser";
import { IsoScene } from "./game/IsoScene";
import { SeedManager } from "./utils/SeedManager";

const startGame = (seed: string): void => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 800,
    height: 600,
    backgroundColor: "#2d2d2d",
    scene: new IsoScene(seed)
  };
  new Phaser.Game(config);
};

document.getElementById("start-btn")!.addEventListener("click", () => {
  const seedInput = (document.getElementById("seed-input") as HTMLInputElement).value;
  const seed = seedInput || new SeedManager().getSeed();
  startGame(seed);
});
