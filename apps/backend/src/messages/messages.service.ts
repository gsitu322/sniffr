import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/sendMessage.dto";
import { PrismaService } from "../prisma/prisma.service";
import { MessagesGateway } from "./messages.gateway";

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private messagesGateway: MessagesGateway
  ) { }

  async sendMessage(body: CreateMessageDto) {
    // Check if a match thread exist. If not then create one.

    // Send the message. 

    // Update the match thread unread count - creating thread should emit event
    // Emit the send event
  }

  async createMatchThread(
    userId: number,
    dogId: number,
    initialMessage?: string
  ) {
    // Create a message thread
    const messageThread = await this.prisma.messageThread.create({
      data: {
        userParticipants: {
          connect: [{ id: userId }],
        },
        dogParticipants: {
          connect: [{ id: dogId }],
        },
      },
      include: {
        dogParticipants: true,
      },
    });

    let lastMessage: string | null = null;

    // Create an initial message if there was one
    if (initialMessage) {
      const message = await this.prisma.message.create({
        data: {
          content: initialMessage,
          senderId: dogId,
          receiverId: userId,
          messageThreadId: messageThread.id,
        },
      });

      lastMessage = message.content;
    }

    const dog = messageThread.dogParticipants[0];

    // emit thread created event for websocket
    this.messagesGateway.emitThreadCreated({
      threadId: `user-${dogId}`, // Match the format your frontend expects
      dogName: dog.name,
      dogImage: dog.image,
      lastMessage: lastMessage ?? "Say something to start the conversation!",
      unreadCount: 1,
      messages: lastMessage
        ? [
          {
            id: String(Date.now()),
            content: lastMessage,
            senderId: String(dogId),
            timestamp: new Date().toISOString(),
            read: false,
          },
        ]
        : [],
    });

    return {
      thread: messageThread,
      initialMessage: lastMessage,
    };
  }
}
