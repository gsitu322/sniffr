import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ThreadsService } from "./threads.service";


@ApiTags("Threads")
@Controller("threads")
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) { }

  // GET /threads?userId=1
  @Get()
  async getThreads(@Query("userId") userId: string) {
    return this.threadsService.getThreadsForUser(parseInt(userId));
  }

  // GET /threads/:id
  @Get(":id")
  async getThread(@Param("id") id: string) {
    return this.threadsService.getThreadById(parseInt(id));
  }

  // GET /threads/:id/messages
  @Get(":id/messages")
  async getMessages(@Param("id") id: string) {
    return this.threadsService.getMessagesForThread(parseInt(id));
  }
}
