import Phaser from "phaser";
import { TerrainGenerator } from "../terrain/TerrainGenerator";
import { IsoTile } from "../terrain/IsoTile";
import { ColorManager } from "../utils/ColorManager";
import { GRID_SIZE, OFFSET } from "../config/constants";

export class IsoScene extends Phaser.Scene {
  constructor(seed) {
    super({ key: "IsoScene" });
    this.seed = seed;
  }

  preload() {
    // Usar ruta relativa a index.html
    this.load.image("tile", "./resources/tiles.png");
    this.load.json("colors", "./resources/colors.json");
  }

  create() {
    this.colorManager = new ColorManager(this);
    const generator = new TerrainGenerator(this.seed);
    const heightMap = generator.generateHeightMap(GRID_SIZE);
    this.drawTerrain(heightMap);
  }

  drawTerrain(heightMap) {
    heightMap.forEach((row, x) => {
      row.forEach((height, y) => {
        const color = this.colorManager.getColor(height);
        new IsoTile(this, x, y, height, color).draw(OFFSET.x, OFFSET.y);
      });
    });
  }
}
