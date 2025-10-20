import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DogsService {
  constructor(private prisma: PrismaService) {}

  async getDogs(limit: number = 10, offset: number = 0) {
    try {
      const dogs = await this.prisma.dog.findMany({
        take: limit,
        skip: offset,
      });
      return dogs;
    } catch (error) {
      console.error("Error in getDogs:", error);
      throw error;
    }
  }

  async createDog(dogData: {
    name: string;
    sex: string;
    breed: string;
    age: number;
    bio: string;
    image: string;
    location?: string;
  }) {
    const dog = await this.prisma.dog.create({
      data: dogData,
    });
    return dog;
  }

  async getDogById(id: number) {
    return this.prisma.dog.findUnique({
      where: { id },
    });
  }

  async updateDog(
    id: number,
    dogData: Partial<{
      name: string;
      sex: string;
      breed: string;
      age: number;
      bio: string;
      image: string;
      location: string;
    }>
  ) {
    return this.prisma.dog.update({
      where: { id },
      data: dogData,
    });
  }

  async deleteDog(id: number) {
    return this.prisma.dog.delete({
      where: { id },
    });
  }
}
