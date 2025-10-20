import { Module, Global } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DogsModule } from "./dogs/dogs.module";
import { MessagesModule } from "./messages/messages.module";
import { UsersModule } from "./users/users.module";
import { CandidatesModule } from "./candidates/candidates.module";
import { PrismaService } from "./prisma/prisma.service";
import { SwipesModule } from "./swipes/swipes.module";

@Global()
@Module({
  imports: [
    DogsModule,
    MessagesModule,
    UsersModule,
    CandidatesModule,
    SwipesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
