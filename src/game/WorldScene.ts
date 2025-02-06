import Phaser from "phaser";
import { World } from "../world/World";
import { defaultWorldConfig } from "../world/WorldConfig";
import { ColorManager } from "../utils/ColorManager";

export class WorldScene extends Phaser.Scene {
  private worldInstance: World;
  private chunkSize: number = defaultWorldConfig.chunkSize;
  private worldSize: number = defaultWorldConfig.worldSize;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(seed: string) {
    super({ key: "WorldScene" });
    this.worldInstance = new World(seed);
  }

  preload(): void {
    this.load.json("colors", "./resources/colors.json");
  }

  create(): void {
    // Genera el mundo global
    this.worldInstance.generateWorld();

    // Configura los límites de la cámara
    const tileSize = 38;
    const worldWidth = this.worldSize * this.chunkSize * tileSize;
    const worldHeight = this.worldSize * this.chunkSize * tileSize;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Agrega controles de teclado para mover la cámara
    if (this.input && this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    } else {
      console.error("Input or keyboard not available");
    }

    // Dibuja cada chunk como un rectángulo (usando el promedio de elevación)
    const colorManager = new ColorManager(this);
    const chunks = this.worldInstance.getAllChunks();
    chunks.forEach(chunk => {
      let sum = 0, count = 0;
      for (let i = 0; i < chunk.tiles.length; i++) {
        for (let j = 0; j < chunk.tiles[i].length; j++) {
          sum += chunk.tiles[i][j];
          count++;
        }
      }
      const avgElevation = count ? sum / count : 0;
      const color = colorManager.getColor(avgElevation);
      const chunkPixelSize = this.chunkSize * tileSize;
      const rectX = chunk.x * chunkPixelSize;
      const rectY = chunk.y * chunkPixelSize;
      const graphics = this.add.graphics();
      graphics.fillStyle(color, 1);
      graphics.fillRect(rectX, rectY, chunkPixelSize, chunkPixelSize);
    });

    // Instrucción
    this.add.text(10, 10, "Haz clic en el mapa para seleccionar un área", { color: "#ffffff" });

    // Al hacer clic, calcula el chunk seleccionado y lanza la BiomeScene
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      const worldX = pointer.worldX;
      const worldY = pointer.worldY;
      const chunkPixelSize = this.chunkSize * tileSize;
      const chunkX = Math.floor(worldX / chunkPixelSize);
      const chunkY = Math.floor(worldY / chunkPixelSize);
      console.log(`Zona seleccionada: Chunk (${chunkX}, ${chunkY})`);
      this.scene.start("BiomeScene", { seed: this.worldInstance.getSeed(), chunkX, chunkY });
    });
  }
}