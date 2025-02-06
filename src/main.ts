import Phaser from "phaser";
import { IsoScene } from "./game/IsoScene";
import { WorldScene } from "./game/WorldScene";
import { BiomeScene } from "./game/BiomeScene";
import { SeedManager } from "./utils/SeedManager";
import "./di/DIConfig";  // Configura DI

const startGame = (seed: string): void => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 1024,
    height: 768,
    backgroundColor: "#2d2d2d",
    // Registramos las escenas; iniciamos con la vista global (WorldScene)
    scene: [
      // new IsoScene(seed), // Opcional: puedes mantenerla para la vista isométrica básica
      new WorldScene(seed),
      new BiomeScene() // Se usa al seleccionar un área
    ]
  };
  new Phaser.Game(config);
};

document.getElementById("start-btn")!.addEventListener("click", () => {
  const seedInput = (document.getElementById("seed-input") as HTMLInputElement).value;
  const seed = seedInput || new SeedManager().getSeed();
  startGame(seed);
});