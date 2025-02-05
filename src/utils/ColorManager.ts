import Phaser from "phaser";
import { HEIGHT_LEVELS } from "../config/constants";

export class ColorManager {
  private scene: Phaser.Scene;
  private colors: {
    water: string;
    lowLand: string;
    midLand: string;
    mountain: string;
    snow: string;
  };

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    // Se asume que el JSON se carga correctamente
    this.colors = this.scene.cache.json.get("colors") as {
      water: string;
      lowLand: string;
      midLand: string;
      mountain: string;
      snow: string;
    };
  }

  public getColor(height: number): number {
    const hexColor = this._getHexColor(height);
    return Phaser.Display.Color.HexStringToColor(hexColor).color;
  }

  private _getHexColor(height: number): string {
    const { water, lowLand, midLand, mountain, snow } = this.colors;
    if (height < HEIGHT_LEVELS.water) return water;
    if (height < HEIGHT_LEVELS.lowLand) return lowLand;
    if (height < HEIGHT_LEVELS.midLand) return midLand;
    if (height < HEIGHT_LEVELS.mountain) return mountain;
    return snow;
  }
}
