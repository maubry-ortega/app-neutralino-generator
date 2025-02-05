import { Biome } from "./Biome";

export class BiomeRepository {
  // Si se recibe un bioma forzado, lo devuelve directamente.
  public getBiomeByConditions(temperature: number, humidity: number, forcedBiome?: string): Biome {
    if (forcedBiome) {
      // Devuelve un bioma basado en el forzado. Asigna un color basado en ese bioma.
      const colors: Record<string, string> = {
        Forest: "#228B22",
        Desert: "#F4A460",
        Mountain: "#A9A9A9",
        Ocean: "#1E90FF",
        Plains: "#7CFC00"
      };
      return { type: forcedBiome as any, color: colors[forcedBiome] || "#fff", temperature, humidity };
    }
    // Lógica normal
    if (temperature > 0.8) return { type: "Desert", color: "#F4A460", temperature, humidity };
    if (temperature < 0.4) return { type: "Ocean", color: "#1E90FF", temperature, humidity };
    return humidity > 0.5
      ? { type: "Forest", color: "#228B22", temperature, humidity }
      : { type: "Plains", color: "#7CFC00", temperature, humidity };
  }
}
