import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SwipeStatus } from "@prisma/client";

@Injectable()
export class SwipesService {
  constructor(private prisma: PrismaService) {}

  async accept(dogId: string, userId: number) {
    await this.prisma.swipe.create({
      data: {
        dogId: parseInt(dogId),
        userId: userId,
        status: SwipeStatus.ACCEPTED,
      },
    });

    // Create an accept swipe in the database with userId and dogId
    console.log(`User ${userId} accepted dog ${dogId}`);
    return { success: true, message: "Dog accepted" };
  }

  async reject(dogId: string, userId: number) {
    await this.prisma.swipe.create({
      data: {
        dogId: parseInt(dogId),
        userId: userId,
        status: SwipeStatus.REJECTED,
      },
    });

    // Create a reject swipe in the database with userId and dogId
    console.log(`User ${userId} rejected dog ${dogId}`);
    return { success: true, message: "Dog rejected" };
  }
}
