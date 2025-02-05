import Phaser from "phaser";
import { HEIGHT_LEVELS } from "../config/constants";

export class ColorManager {
  constructor(scene) {
    this.scene = scene;
    this.colors = this.scene.cache.json.get("colors");
  }

  getColor(height) {
    const hexColor = this._getHexColor(height);
    return Phaser.Display.Color.HexStringToColor(hexColor).color;
  }

  _getHexColor(height) {
    const { water, lowLand, midLand, mountain, snow } = this.colors;
    if (height < HEIGHT_LEVELS.water) return water;
    if (height < HEIGHT_LEVELS.lowLand) return lowLand;
    if (height < HEIGHT_LEVELS.midLand) return midLand;
    if (height < HEIGHT_LEVELS.mountain) return mountain;
    return snow;
  }
}
