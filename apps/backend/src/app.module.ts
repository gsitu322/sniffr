import { Module, Global } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DogsModule } from "./dogs/dogs.module";
import { MessagesModule } from "./messages/messages.module";
import { UsersModule } from "./users/users.module";
import { MatchesModule } from "./matches/matches.module";
import { PrismaService } from "./prisma/prisma.service";

@Global()
@Module({
  imports: [DogsModule, MessagesModule, UsersModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
