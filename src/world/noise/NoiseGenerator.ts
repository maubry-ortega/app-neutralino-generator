import { createNoise2D } from "simplex-noise";
import seedrandom from "seedrandom";
import { NoiseConfig } from "./NoiseConfig";

export class NoiseGenerator {
  private noise2D: (x: number, y: number) => number;

  constructor(config: NoiseConfig) {
    const rng = seedrandom(config.seed);
    this.noise2D = createNoise2D(rng);
  }

  public generate(x: number, y: number, scale: number = 0.1): number {
    return (this.noise2D(x * scale, y * scale) + 1) / 2;
  }
}
