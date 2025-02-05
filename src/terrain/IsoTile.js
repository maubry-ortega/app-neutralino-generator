export class IsoTile {
  constructor(scene, x, y, height, color) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.height = height;
    this.color = color;
  }

  draw(offsetX, offsetY) {
    const tileSize = this.scene.tileSize || 38;  // Usa 38 si no está definido en la escena
    const isoX = (this.x - this.y) * tileSize * 0.5 + offsetX;
    const isoY = (this.x + this.y) * tileSize * 0.25 + offsetY - this.height * 0.3;

    // Usamos graphics para evitar problemas con imágenes pequeñas
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(this.color, 1);
    graphics.fillRect(isoX, isoY, tileSize, tileSize);
  }
}
