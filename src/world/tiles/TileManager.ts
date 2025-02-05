import { Tile } from "./Tile";

export class TileManager {
  public createTile(biome: string, elevation: number, moisture: number): Tile {
    return { biome, elevation, moisture };
  }
}
