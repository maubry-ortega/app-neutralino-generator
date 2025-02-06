export interface NoiseConfig {
  seed: string;
  scale: number;
  octaves: number;
  persistence: number;
  lacunarity: number;
}

export const defaultNoiseConfig: NoiseConfig = {
  seed: "default-seed",
  scale: 0.1,
  octaves: 4,
  persistence: 0.5,
  lacunarity: 2.0,
};
