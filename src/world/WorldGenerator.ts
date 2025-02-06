import { NoiseGenerator } from "./noise/NoiseGenerator";
import { BiomeRepository } from "./biomes/BiomeRepository";
import { ChunkManager } from "./chunks/ChunkManager";
import { TileManager } from "./tiles/TileManager";
import { Chunk } from "./chunks/Chunk";
import { defaultNoiseConfig } from "./noise/NoiseConfig";
import { TerrainGenerator } from "../terrain/TerrainGenerator";

export class WorldGenerator {
  private noiseGenerator: NoiseGenerator;
  private biomeRepository: BiomeRepository;
  private chunkManager: ChunkManager;
  private tileManager: TileManager;
  private forcedBiome: string | null = null;
  private terrainGenerator: TerrainGenerator;

  constructor(seed: string, forcedBiome?: string) {
    const noiseConfig = { ...defaultNoiseConfig, seed };
    this.noiseGenerator = new NoiseGenerator(noiseConfig);
    this.biomeRepository = new BiomeRepository();
    this.chunkManager = new ChunkManager();
    this.tileManager = new TileManager();
    this.terrainGenerator = new TerrainGenerator(seed);
    if (forcedBiome) {
      this.forcedBiome = forcedBiome;
    }
  }

  public generateChunk(x: number, y: number, chunkSize: number): Chunk {
    // Offset global para este chunk
    const offsetX = x * chunkSize;
    const offsetY = y * chunkSize;
    const heightMap = this.terrainGenerator.generateHeightMap(chunkSize, offsetX, offsetY);
    // Genera el mapa de biomas (opcional, para la visualización global)
    // const biomeMap = this.terrainGenerator.generateBiomeMap(heightMap);
    const tiles: number[][] = [];
    for (let i = 0; i < chunkSize; i++) {
      const row: number[] = [];
      for (let j = 0; j < chunkSize; j++) {
        const elevation = heightMap[i][j];
        const temperature = elevation;
        const humidity = 1 - elevation;
        const biome = this.biomeRepository.getBiomeByConditions(temperature, humidity, this.forcedBiome || undefined);
        // Por simplicidad, se guarda la elevación; se podría guardar más información
        row.push(elevation);
      }
      tiles.push(row);
    }
    const chunk: Chunk = { x, y, tiles };
    this.chunkManager.addChunk(chunk);
    return chunk;
  }

  public getAllChunks(): Chunk[] {
    return this.chunkManager.getAllChunks();
  }
}
