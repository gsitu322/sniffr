import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "../threads/dto/sendMessage.dto";
import { PrismaService } from "../prisma/prisma.service";
import { ThreadsGateway } from "./threads.gateway";
import { ThreadDto } from "./dto/thread.dto";
import { MessageDto } from "./dto/message.dto";

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

  /**
   * Converts Prisma MessageThread to ThreadDto format expected by frontend
   * @param thread - Prisma thread with included relations
   * @param options - Optional: includeAllMessages (default: false, only last message)
   */
  private toThreadDto(
    thread: any, // Prisma MessageThread with included relations
    options?: { includeAllMessages?: boolean }
  ): ThreadDto {
    const dog = thread.dogParticipants?.[0];
    const lastMessage = thread.messages?.[0];
    const allMessages = options?.includeAllMessages
      ? thread.messages || []
      : lastMessage
        ? [lastMessage]
        : [];

    return {
      threadId: `user-${dog?.id ?? thread.id}`, // Match frontend format: user-{dogId}
      dogName: dog?.name ?? "Unknown",
      dogImage: dog?.image ?? "",
      lastMessage:
        lastMessage?.content ?? "Say something to start the conversation!",
      unreadCount: 0, // You'll need to calculate this based on read status
      messages: allMessages.map((msg: any) => this.toMessageDto(msg)),
    };
  }

  /**
   * Converts Prisma Message to MessageDto format expected by frontend
   */
  private toMessageDto(msg: any): MessageDto {
    return {
      id: String(msg.id), // Convert to string
      content: msg.content,
      senderId: String(msg.senderId), // Frontend expects senderId, not userId/dogId separately
      timestamp: msg.createdAt.toISOString(),
      read: msg.read ?? false,
    };
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

    // Transform each thread to DTO
    return threads.map((thread) => this.toThreadDto(thread));
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
