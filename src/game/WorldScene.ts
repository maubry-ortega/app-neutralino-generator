import Phaser from "phaser";
import { World } from "../world/World";
import { defaultWorldConfig } from "../world/WorldConfig";

export class WorldScene extends Phaser.Scene {
  private worldInstance: World;

  constructor(seed: string) {
    super({ key: "WorldScene" });
    this.worldInstance = new World(seed);
  }

  preload(): void {
    this.load.json("colors", "./resources/colors.json");
  }

  create(): void {
    // Genera el mundo completo
    this.worldInstance.generateWorld();
    
    // Usa la propiedad 'color' en lugar de 'fill' en el estilo de texto
    this.add.text(10, 10, "Mundo generado. Revisa la consola.", { color: "#ffffff" });

    // Ejemplo de controles de cámara (si deseas implementarlos aquí)
    if (this.input && this.input.keyboard) {
      const cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on("keydown", () => {
        if (cursors.left?.isDown) {
          this.cameras.main.scrollX -= 10;
        } else if (cursors.right?.isDown) {
          this.cameras.main.scrollX += 10;
        }
        if (cursors.up?.isDown) {
          this.cameras.main.scrollY -= 10;
        } else if (cursors.down?.isDown) {
          this.cameras.main.scrollY += 10;
        }
      });
    }
  }

  update(time: number, delta: number): void {
    this.worldInstance.updateTime(delta / 1000);
  }
}