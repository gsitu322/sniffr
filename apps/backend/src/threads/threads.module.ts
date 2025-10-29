import { Module } from "@nestjs/common";
import { ThreadsController } from "./threads.controller";
import { ThreadsService } from './threads.service';
import { ThreadsGateway } from "./threads.gateway";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  exports: [ThreadsService],
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsGateway, PrismaService],
})
export class ThreadsModule { }
