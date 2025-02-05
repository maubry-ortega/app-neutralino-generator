import { createNoise2D } from "simplex-noise";
import { NOISE_SCALE } from "../config/constants";

export class TerrainGenerator {
  constructor(seed) {
    // Creamos noise2D usando la semilla; si no se pasa, se usa Math.random
    this.noise = createNoise2D(() => seed || Math.random());
  }

  generateHeightMap(gridSize) {
    const heightMap = [];
    for (let x = 0; x < gridSize; x++) {
      heightMap[x] = [];
      for (let y = 0; y < gridSize; y++) {
        // Generamos un valor de altura entre 0 y 100
        const height = Math.floor((this.noise(x * NOISE_SCALE, y * NOISE_SCALE) + 1) * 50);
        heightMap[x][y] = Math.max(0, Math.min(height, 100));
      }
    }
    return heightMap;
  }
}
