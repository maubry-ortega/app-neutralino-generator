import Phaser from "phaser";
import { TerrainGenerator } from "../terrain/TerrainGenerator";
import { IsoTile } from "../terrain/IsoTile";
import { ColorManager } from "../utils/ColorManager";
import { GRID_SIZE, OFFSET } from "../config/constants";

export class IsoScene extends Phaser.Scene {
  private seed: string;
  public tileSize: number = 38;

  constructor(seed: string) {
    super({ key: "IsoScene" });
    this.seed = seed;
  }

  preload(): void {
    this.load.json("colors", "./resources/colors.json");
  }

  create(): void {
    const colorManager = new ColorManager(this);
    const generator = new TerrainGenerator(this.seed);
    const heightMap = generator.generateHeightMap(GRID_SIZE);

    this.drawTerrain(heightMap, colorManager);
  }

  private drawTerrain(heightMap: number[][], colorManager: ColorManager): void {
    heightMap.forEach((row, x) => {
      row.forEach((height, y) => {
        const color = colorManager.getColor(height);
        new IsoTile(this, x, y, height, color).draw(OFFSET.x, OFFSET.y);
      });
    });
  }
}
