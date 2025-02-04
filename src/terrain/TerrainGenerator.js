import { createNoise2D } from "simplex-noise";
import { NOISE_SCALE } from "../config/constants.js";

export class TerrainGenerator {
  constructor() {
    this.noise = createNoise2D();
  }

  generateHeightMap(gridSize) {
    const heightMap = [];
    for (let x = 0; x < gridSize; x++) {
      heightMap[x] = [];
      for (let y = 0; y < gridSize; y++) {
        const height = Math.floor((this.noise(x / NOISE_SCALE, y / NOISE_SCALE) + 1) * 50);
        heightMap[x][y] = Math.max(0, Math.min(height, 100));
      }
    }
    return heightMap;
  }
}
