import { Chunk } from "./Chunk";

export class ChunkManager {
  private chunks: Map<string, Chunk> = new Map();

  private getChunkKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  public addChunk(chunk: Chunk): void {
    this.chunks.set(this.getChunkKey(chunk.x, chunk.y), chunk);
  }

  public getChunk(x: number, y: number): Chunk | undefined {
    return this.chunks.get(this.getChunkKey(x, y));
  }
}
