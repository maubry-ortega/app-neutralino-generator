export class IsoTile {
  constructor(scene, x, y, height, colors) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.height = height;
    this.colors = colors;
  }

  draw(offsetX, offsetY) {
    const isoX = (this.x - this.y) * 0.5 * 38 + offsetX;
    const isoY = (this.x + this.y) * 0.25 * 38 + offsetY;
    const color = this.getColorForHeight(this.height);
    
    const tile = this.scene.add.image(isoX, isoY, "tile").setTintFill(color);
    tile.setOrigin(0.5, 0.5);
  }

  getColorForHeight(height) {
    if (height < 20) return Phaser.Display.Color.HexStringToColor(this.colors.water).color;
    if (height < 40) return Phaser.Display.Color.HexStringToColor(this.colors.lowLand).color;
    if (height < 60) return Phaser.Display.Color.HexStringToColor(this.colors.midLand).color;
    if (height < 80) return Phaser.Display.Color.HexStringToColor(this.colors.mountain).color;
    return Phaser.Display.Color.HexStringToColor(this.colors.snow).color;
  }
}
