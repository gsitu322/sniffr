import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "../threads/dto/sendMessage.dto";
import { PrismaService } from "../prisma/prisma.service";
import { ThreadsGateway } from "./threads.gateway";

@Injectable()
export class ThreadsService {
  constructor(
    private prisma: PrismaService,
    private threadsGateway: ThreadsGateway
  ) { }

  async sendMessage(body: CreateMessageDto) {
    // Check if a match thread exist. If not then create one.
    // Send the message.
    // Update the match thread unread count - creating thread should emit event
    // Emit the send event
  }

  // Fetch all threads for a user (most recent first) with last message and dog info
  async getThreadsForUser(userId: number) {
    const threads = await this.prisma.messageThread.findMany({
      where: {
        userParticipants: {
          some: { id: userId },
        },
      },
      include: {
        dogParticipants: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return threads;
  }

  // Fetch a single thread with participants and all messages (newest first)
  async getThreadById(threadId: number) {
    return this.prisma.messageThread.findUnique({
      where: { id: threadId },
      include: {
        dogParticipants: true,
        userParticipants: true,
        messages: { orderBy: { createdAt: "desc" } },
      },
    });
  }

  // Fetch messages for a thread (paged later if needed)
  async getMessagesForThread(threadId: number) {
    return this.prisma.message.findMany({
      where: { messageThreadId: threadId },
      orderBy: { createdAt: "desc" },
    });
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
    this.threadsGateway.emitThreadCreated({
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
