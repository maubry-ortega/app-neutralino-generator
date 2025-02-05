import { createNoise2D } from "simplex-noise";
import { NOISE_SCALE } from "../config/constants";
import seedrandom from "seedrandom";

export class TerrainGenerator {
  private noise: (x: number, y: number) => number;

  constructor(seed: string) {
    // Usamos seedrandom para generar una función aleatoria basada en la semilla
    const rng = seedrandom(seed);
    this.noise = createNoise2D(rng);
  }

  public generateHeightMap(gridSize: number): number[][] {
    const heightMap: number[][] = [];
    for (let x = 0; x < gridSize; x++) {
      heightMap[x] = [];
      for (let y = 0; y < gridSize; y++) {
        const value = this.noise(x * NOISE_SCALE, y * NOISE_SCALE);
        const height = Math.floor((value + 1) * 50); // Valor entre 0 y 100
        heightMap[x][y] = Math.max(0, Math.min(height, 100));
      }
    }
    return heightMap;
  }
}
