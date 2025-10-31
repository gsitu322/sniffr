import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SwipeDto } from "./dto/swipe.dto";
import { Swipe } from "@prisma/client";
import { SwipeStatus } from "@prisma/client";
import { ThreadsService } from "../threads/threads.service";
import { INITIAL_MESSAGES } from "../../data/initialMessags";

@Injectable()
export class SwipesService {
  constructor(
    private prisma: PrismaService,
    private threadsService: ThreadsService
  ) { }

  generateInitalMessage(): string {
    // Return a random message from INITIAL_MESSAGES
    const index = Math.floor(Math.random() * INITIAL_MESSAGES.length);
    return INITIAL_MESSAGES[index];
  }

  async create(data: SwipeDto, userId: number) {
    console.log("Creating swipe", data, userId);

    let swipe: Swipe;

    try {
      swipe = await this.prisma.swipe.create({
        data: Object.assign(data, {
          userId: userId,
        }),
      });
    } catch (error) {
      console.error("Error creating swipe", error);
      return {
        success: false,
        message: "Error creating swipe",
      };
    }

    if (swipe.userStatus === SwipeStatus.ACCEPTED) {
      this.handleDogSwipeMatching(swipe);
    }

    // Create an accept swipe in the database with userId and dogId
    return {
      success: true,
      message: `Dog ${data.userStatus} logged successfully`,
    };
  }

  handleDogSwipeMatching(swipe: Swipe) {
    // Delay the matching for 1-5 seconds
    const delay = Math.random() * 5000 + 1000;

    // Randomly decide whether the dog will be match with the user
    const willMatch = Math.random() < 0.75; // 75% chance to match
    const dogStatus = willMatch ? SwipeStatus.ACCEPTED : SwipeStatus.REJECTED;

    setTimeout(async () => {
      // Update the swipe with the dog's status
      swipe = await this.prisma.swipe.update({
        where: { id: swipe.id },
        data: {
          dogStatus,
        },
      });

      if (dogStatus === SwipeStatus.ACCEPTED) {
        const willSendMessage = Math.random() < 0.9;
        const initialMessage = willSendMessage
          ? this.generateInitalMessage()
          : "";

        await this.threadsService.createMatchThread(
          swipe.userId,
          swipe.dogId,
          initialMessage
        );
      }
    }, delay);
  }
}
