import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async getCandidates(userId: number, limit: number = 10) {
    // Get dogs that the user hasn't swiped on yet
    const candidates = await this.prisma.dog.findMany({
      where: {
        Swipe: {
          none: {
            userId: userId,
          },
        },
      },
      take: limit,
    });

    return candidates;
  }
}
