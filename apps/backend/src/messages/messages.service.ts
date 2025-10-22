import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/sendMessage.dto';

@Injectable()
export class MessagesService {
  async sendMessage(body: CreateMessageDto) {
}
