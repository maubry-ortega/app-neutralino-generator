import { WorldGenerator } from "./WorldGenerator";
import { defaultWorldConfig } from "./WorldConfig";
import { TimeManager } from "../time/TimeManager";
import { Chunk } from "./chunks/Chunk";

export class World {
  private generator: WorldGenerator;
  private timeManager: TimeManager;
  private seed: string;

  constructor(seed: string, forcedBiome?: string) {
    this.seed = seed;
    this.generator = new WorldGenerator(seed, forcedBiome);
    this.timeManager = new TimeManager({ dayLength: 300, nightLength: 300 });
  }

  public getSeed(): string {
    return this.seed;
  }

  public updateTime(seconds: number): void {
    this.timeManager.tick(seconds);
  }

  public generateWorld(): void {
    const { worldSize, chunkSize } = defaultWorldConfig;
    for (let x = 0; x < worldSize; x++) {
      for (let y = 0; y < worldSize; y++) {
        this.generator.generateChunk(x, y, chunkSize);
      }
    }
    console.log("World generated!");
  }

  public getAllChunks(): Chunk[] {
    return this.generator.getAllChunks();
  }
}
