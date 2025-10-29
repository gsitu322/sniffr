import { Module } from "@nestjs/common";
import { SwipesService } from "./swipes.service";
import { SwipesController } from "./swipes.controller";
import { MessagesModule } from "../messages/messages.module";

@Module({
  imports: [MessagesModule],
  providers: [SwipesService],
  controllers: [SwipesController],
})
export class SwipesModule {}
