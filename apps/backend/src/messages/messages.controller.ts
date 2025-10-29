import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateMessageDto } from "./dto/sendMessage.dto";
import { MessagesService } from "./messages.service";
import { MessagesGateway } from "./messages.gateway";

@ApiTags("Messages")
@Controller("messages")
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly messagesGatway: MessagesGateway,
  ) { }

  @Post("send")
  async sendMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.sendMessage(body);
  }

  @Post("thread-created")
  async threadCreated(@Body() payload: any) {
    this.messagesGatway.emitThreadCreated(payload);
    return { ok: true };
  }
}
