import Phaser from "phaser";

export class IsoTile {
  private scene: Phaser.Scene;
  private x: number;
  private y: number;
  private height: number;
  private color: number;

  constructor(scene: Phaser.Scene, x: number, y: number, height: number, color: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.height = height;
    this.color = color;
  }

  public draw(offsetX: number, offsetY: number): void {
    const tileSize = (this.scene as any).tileSize || 38;
    const isoX = (this.x - this.y) * tileSize * 0.5 + offsetX;
    const isoY = (this.x + this.y) * tileSize * 0.25 + offsetY - this.height * 0.3;
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(this.color, 1);
    graphics.fillRect(isoX, isoY, tileSize, tileSize);
  }
}
