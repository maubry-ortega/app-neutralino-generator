import "reflect-metadata";
import { container } from "tsyringe";
import { BiomeRepository } from "../world/biomes/BiomeRepository";
import { ResourceRepository } from "../resources/ResourceRepository";
import { WorldGenerator } from "../world/WorldGenerator";

container.register("BiomeRepository", { useClass: BiomeRepository });
container.register("ResourceRepository", { useClass: ResourceRepository });
container.register("WorldGenerator", { useClass: WorldGenerator });

export { container };
