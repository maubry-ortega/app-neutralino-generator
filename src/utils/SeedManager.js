import seedrandom from "seedrandom";

export class SeedManager {
  constructor(seed) {
    this.seed = seed || Math.random().toString(36).substr(2, 9);
    this.rng = seedrandom(this.seed);
  }

  getSeed() {
    return this.seed;
  }

  getRandom() {
    return this.rng();
  }
}
