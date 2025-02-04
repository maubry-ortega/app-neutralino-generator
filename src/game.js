import Phaser from "phaser";
import { TerrainGenerator } from "./terrain/TerrainGenerator.js";
import { IsoTile } from "./terrain/IsoTile.js";
import { TILE_SIZE, GRID_SIZE, OFFSET } from "./config/constants.js";

class IsoScene extends Phaser.Scene {
  constructor() {
    super({ key: "IsoScene" });
    this.tileSize = TILE_SIZE;
    this.gridSize = GRID_SIZE;
  }

  preload() {
    this.load.image("tile", "/resources/tiles.png"); 
    this.load.json("colors", "/colors.json");
  }

  create() {
    // ✅ Solución al error de AudioContext
    this.input.once("pointerdown", () => {
      if (this.sound.context.state === "suspended") {
        this.sound.context.resume();
      }
    });

    // ✅ Cargar colores desde JSON
    this.colors = this.cache.json.get("colors") || {
      water: "#1E90FF",
      lowLand: "#32CD32",
      midLand: "#228B22",
      mountain: "#8B4513",
      snow: "#FFFFFF"
    };

    const generator = new TerrainGenerator();
    const heightMap = generator.generateHeightMap(this.gridSize);

    this.drawTerrain(heightMap, OFFSET.x, OFFSET.y);
  }

  drawTerrain(heightMap, offsetX, offsetY) {
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        new IsoTile(this, x, y, heightMap[x][y], this.colors).draw(offsetX, offsetY);
      }
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  parent: "game-container",
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  scene: [IsoScene],
  render: {
    pixelArt: true,
    antialias: false,
    mipmapFilter: "NEAREST"
  }
};

new Phaser.Game(config);
