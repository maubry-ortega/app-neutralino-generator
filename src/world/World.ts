// /src/world/World.ts
import { WorldGenerator } from "./WorldGenerator";
import { defaultWorldConfig } from "./WorldConfig";
import { TimeManager } from "../time/TimeManager";

export class World {
  private generator: WorldGenerator;
  private timeManager: TimeManager;

  constructor(seed: string, forcedBiome?: string) {
    this.generator = new WorldGenerator(seed, forcedBiome);
    this.timeManager = new TimeManager({ dayLength: 300, nightLength: 300 });
  }

  public updateTime(seconds: number): void {
    this.timeManager.tick(seconds);
    console.log(`Hora actual: ${this.timeManager.getCurrentTimeFormatted()}`);
    console.log(`Fase: ${this.timeManager.getCurrentPhase()}`);
    console.log(`Progreso: ${this.timeManager.getProgress().toFixed(2)}%`);
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
}
