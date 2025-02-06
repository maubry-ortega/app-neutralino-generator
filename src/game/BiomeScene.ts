import Phaser from "phaser";
import { TerrainGenerator } from "../terrain/TerrainGenerator";
import { IsoTile } from "../terrain/IsoTile";
import { ColorManager } from "../utils/ColorManager";
import { defaultWorldConfig } from "../world/WorldConfig";
import { TILE_SIZE } from "../config/constants";

export class BiomeScene extends Phaser.Scene {
  private seed!: string;
  private chunkX!: number;
  private chunkY!: number;
  public tileSize: number = TILE_SIZE;

  constructor() {
    super({ key: "BiomeScene" });
  }

  init(data: { seed: string; chunkX: number; chunkY: number }): void {
    this.seed = data.seed;
    this.chunkX = data.chunkX;
    this.chunkY = data.chunkY;
  }

  preload(): void {
    this.load.json("colors", "./resources/colors.json");
  }

  create(): void {
    const chunkSize = defaultWorldConfig.chunkSize;
    const generator = new TerrainGenerator(this.seed);
    const heightMap = generator.generateHeightMap(chunkSize);
    const colorManager = new ColorManager(this);
    // Centra el chunk en la pantalla
    const offsetX = (this.cameras.main.width - chunkSize * this.tileSize) / 2;
    const offsetY = (this.cameras.main.height - chunkSize * this.tileSize) / 2;
    for (let x = 0; x < chunkSize; x++) {
      for (let y = 0; y < chunkSize; y++) {
        const color = colorManager.getColor(heightMap[x][y]);
        new IsoTile(this, x, y, heightMap[x][y], color).draw(offsetX, offsetY);
      }
    }
    // Botón para volver a la vista global
    const backText = this.add.text(10, 10, "Volver", { color: "#ffffff", fontSize: "20px" }).setInteractive();
    backText.on("pointerdown", () => {
      this.scene.start("WorldScene", { seed: this.seed });
    });
  }
}
