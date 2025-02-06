import { NoiseGenerator } from "./noise/NoiseGenerator";
import { BiomeRepository } from "./biomes/BiomeRepository";
import { ChunkManager } from "./chunks/ChunkManager";
import { TileManager } from "./tiles/TileManager";
import { Chunk } from "./chunks/Chunk";
import { defaultNoiseConfig } from "./noise/NoiseConfig";

export class WorldGenerator {
  private noiseGenerator: NoiseGenerator;
  private biomeRepository: BiomeRepository;
  private chunkManager: ChunkManager;
  private tileManager: TileManager;
  private forcedBiome: string | null = null;

  constructor(seed: string, forcedBiome?: string) {
    const noiseConfig = { ...defaultNoiseConfig, seed };
    this.noiseGenerator = new NoiseGenerator(noiseConfig);
    this.biomeRepository = new BiomeRepository();
    this.chunkManager = new ChunkManager();
    this.tileManager = new TileManager();
    if (forcedBiome) {
      this.forcedBiome = forcedBiome;
    }
  }

  public generateChunk(x: number, y: number, chunkSize: number): Chunk {
    const tiles: number[][] = [];
    for (let i = 0; i < chunkSize; i++) {
      const row: number[] = [];
      for (let j = 0; j < chunkSize; j++) {
        const globalX = x * chunkSize + i;
        const globalY = y * chunkSize + j;
        const elevation = this.noiseGenerator.generate(globalX, globalY);
        const temperature = elevation;
        const humidity = 1 - elevation;
        const biome = this.biomeRepository.getBiomeByConditions(temperature, humidity, this.forcedBiome || undefined);
        const tile = this.tileManager.createTile(biome.type, elevation, humidity);
        row.push(tile.elevation);
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
