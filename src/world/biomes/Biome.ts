export type BiomeType = "Forest" | "Desert" | "Mountain" | "Ocean" | "Plains";

export interface Biome {
  type: BiomeType;
  color: string;
  temperature: number;
  humidity: number;
}
