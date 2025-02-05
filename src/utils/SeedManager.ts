import seedrandom from "seedrandom";

export class SeedManager {
  private seed: string;
  private rng: seedrandom.prng;

  constructor(seed?: string) {
    this.seed = seed || Math.random().toString(36).substr(2, 9);
    this.rng = seedrandom(this.seed);
  }

  public getSeed(): string {
    return this.seed;
  }

  public getRandom(): number {
    return this.rng();
  }
}
