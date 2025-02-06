import Phaser from "phaser";
import { World } from "../world/World";
import { defaultWorldConfig } from "../world/WorldConfig";
import { TerrainGenerator } from "../terrain/TerrainGenerator";

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
    this.load.json("biomes", "./resources/biomes.json");
    this.load.json("colors", "./resources/colors.json");
  }

  create(): void {
    // Genera el mundo global (se generan todos los chunks)
    this.worldInstance.generateWorld();

    const tileSize = 38;
    const chunkPixelSize = this.chunkSize * tileSize;
    const worldWidth = this.worldSize * chunkPixelSize;
    const worldHeight = this.worldSize * chunkPixelSize;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Controles de cámara
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Instancia el TerrainGenerator para obtener mapas de altura y biomas
    const terrainGenerator = new TerrainGenerator(this.worldInstance.getSeed());
    const biomes = this.cache.json.get("biomes") as any[];

    const chunks = this.worldInstance.getAllChunks();
    chunks.forEach((chunk) => {
      // Genera el mapa de alturas para este chunk usando un offset global
      const heightMap = terrainGenerator.generateHeightMap(this.chunkSize, chunk.x * this.chunkSize, chunk.y * this.chunkSize);
      const biomeMap = terrainGenerator.generateBiomeMap(heightMap);

      // Para cada tile en el chunk, se dibuja un rectángulo con el color del bioma
      for (let i = 0; i < biomeMap.length; i++) {
        for (let j = 0; j < biomeMap[i].length; j++) {
          const biomeId = biomeMap[i][j];
          const biome = biomes.find((b: any) => b.id === biomeId) || { color: "#000000" };
          // Asegura que biome.color sea un string
          const colorString = typeof biome.color === "string" ? biome.color : "#000000";
          const color = Phaser.Display.Color.HexStringToColor(colorString).color;
          const x = chunk.x * chunkPixelSize + j * tileSize;
          const y = chunk.y * chunkPixelSize + i * tileSize;
          this.add.rectangle(x, y, tileSize, tileSize, color).setOrigin(0);
        }
      }
    });

    this.add.text(10, 10, "Haz clic en el mapa para seleccionar un área", { color: "#ffffff" });

    // Al hacer clic, calcula el chunk seleccionado (ajustando por scroll) y lanza BiomeScene
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      const worldX = pointer.worldX;
      const worldY = pointer.worldY;
      const chunkX = Math.floor((worldX - this.cameras.main.scrollX) / chunkPixelSize);
      const chunkY = Math.floor((worldY - this.cameras.main.scrollY) / chunkPixelSize);
      console.log(`Zona seleccionada: Chunk (${chunkX}, ${chunkY})`);
      if (chunkX >= 0 && chunkY >= 0 && chunkX < this.worldSize && chunkY < this.worldSize) {
        this.scene.start("BiomeScene", { seed: this.worldInstance.getSeed(), chunkX, chunkY });
      } else {
        console.warn("Coordenadas fuera del rango del mundo.");
      }
    });
  }

  update(): void {
    if (this.cursors.left?.isDown) {
      this.cameras.main.scrollX -= 5;
    } else if (this.cursors.right?.isDown) {
      this.cameras.main.scrollX += 5;
    }
    if (this.cursors.up?.isDown) {
      this.cameras.main.scrollY -= 5;
    } else if (this.cursors.down?.isDown) {
      this.cameras.main.scrollY += 5;
    }
  }
}
