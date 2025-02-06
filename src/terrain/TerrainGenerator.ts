import { createNoise2D } from "simplex-noise";
import seedrandom from "seedrandom";
import { NOISE_SCALE } from "../config/constants";
// Importa el JSON de biomas (asegúrate de que "resolveJsonModule" esté habilitado en tsconfig.json)
import biomesData from "../../public/resources/biomes.json";

// Definición de la interfaz para un bioma (según el JSON)
interface BiomeData {
  id: string;
  name: string;
  color: string;
  emoji: string;
  tags: string[];
  temperature: {
    min: number;
    max: number;
    variation: number;
  };
  humidity: {
    min: number;
    max: number;
    seasonalEffect: number;
  };
  waterColor: string;
  grassColor: string;
  resources: string[];
  elevation?: {
    min: number;
    max: number;
  };
}

export class TerrainGenerator {
  private noise: (x: number, y: number) => number;

  constructor(seed: string) {
    const rng = seedrandom(seed);
    this.noise = createNoise2D(rng);
  }

  // Genera un mapa de alturas con offset para variación global
  public generateHeightMap(
    gridSize: number,
    offsetX: number = 0,
    offsetY: number = 0
  ): number[][] {
    const heightMap: number[][] = [];
    for (let x = 0; x < gridSize; x++) {
      heightMap[x] = [];
      for (let y = 0; y < gridSize; y++) {
        const value = this.noise((x + offsetX) * NOISE_SCALE, (y + offsetY) * NOISE_SCALE);
        const height = Math.floor((value + 1) * 50);
        heightMap[x][y] = Math.max(0, Math.min(height, 100));
      }
    }
    return heightMap;
  }

  // Genera un mapa de biomas basado en la elevación usando reglas definidas en el JSON.
  public generateBiomeMap(heightMap: number[][]): string[][] {
    const biomeMap: string[][] = [];
    // Convertimos el JSON a un array tipado
    const biomes: BiomeData[] = biomesData as BiomeData[];
    for (let x = 0; x < heightMap.length; x++) {
      biomeMap[x] = [];
      for (let y = 0; y < heightMap[x].length; y++) {
        const elevation = heightMap[x][y];
        // Busca el primer bioma que tenga la propiedad "elevation" y cuyo rango incluya el valor.
        const biome = biomes.find((b: BiomeData) => {
          if (!b.elevation) return false;
          return elevation >= b.elevation.min && elevation <= b.elevation.max;
        });
        // Si no se encontró ningún bioma, se asigna "default"
        biomeMap[x][y] = biome ? biome.id : "default";
      }
    }
    return biomeMap;
  }
}
