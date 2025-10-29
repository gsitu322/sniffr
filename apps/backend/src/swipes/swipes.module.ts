import { Module } from "@nestjs/common";
import { SwipesService } from "./swipes.service";
import { SwipesController } from "./swipes.controller";
import { ThreadsModule } from "../threads/threads.module";

@Module({
  imports: [ThreadsModule],
  providers: [SwipesService],
  controllers: [SwipesController],
})
export class SwipesModule { }
