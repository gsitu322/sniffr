import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DogsModule } from './dogs/dogs.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [DogsModule, MessagesModule, UsersModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
