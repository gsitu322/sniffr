import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SwipeStatus } from "@prisma/client";
import { SwipeDto } from "./dto/swipe.dto";

@Injectable()
export class SwipesService {
  constructor(private prisma: PrismaService) {}

  async create(data: SwipeDto, userId: number) {
    await this.prisma.swipe.create({
      data: Object.assign(data, {
        userId: userId,
      }),
    });

    // Create an accept swipe in the database with userId and dogId
    return { success: true, message: `Dog ${data.status} logged successfully` };
  }
}
