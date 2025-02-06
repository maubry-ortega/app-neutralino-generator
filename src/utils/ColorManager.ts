import Phaser from "phaser";
import { HEIGHT_LEVELS } from "../config/constants";

export class ColorManager {
  private scene: Phaser.Scene;
  private colors: { [key: string]: string[] };

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.colors = this.scene.cache.json.get("colors") as { [key: string]: string[] };
  }

  public getColor(height: number): number {
    const hexColor = this._getHexColor(height);
    return Phaser.Display.Color.HexStringToColor(hexColor).color;
  }

  private _getHexColor(height: number): string {
    const { water, lowLand, midLand, mountain, snow } = this.colors;
    if (height < HEIGHT_LEVELS.water) return this._getRandomColor(water);
    if (height < HEIGHT_LEVELS.lowLand) return this._getRandomColor(lowLand);
    if (height < HEIGHT_LEVELS.midLand) return this._getRandomColor(midLand);
    if (height < HEIGHT_LEVELS.mountain) return this._getRandomColor(mountain);
    return this._getRandomColor(snow);
  }

  private _getRandomColor(colors: string[]): string {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }
}
