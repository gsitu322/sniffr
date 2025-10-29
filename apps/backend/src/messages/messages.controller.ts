import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateMessageDto } from "./dto/sendMessage.dto";
import { MessagesService } from "./messages.service";

@ApiTags("Messages")
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post("send")
  async sendMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.sendMessage(body);
  }
}
