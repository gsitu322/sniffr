import { Module } from "@nestjs/common";
import { DogsController } from "./dogs.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [DogsController],
})
export class DogsModule {}
