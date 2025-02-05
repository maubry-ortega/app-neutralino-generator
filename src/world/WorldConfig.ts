export interface WorldConfig {
  chunkSize: number;
  worldSize: number;
  biomes: string[];
}

export const defaultWorldConfig: WorldConfig = {
  chunkSize: 16,
  worldSize: 10,
  biomes: ["Forest", "Desert", "Mountain", "Ocean", "Plains"]
};
