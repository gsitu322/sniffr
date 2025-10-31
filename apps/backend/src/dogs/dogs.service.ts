import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DogResponseDto } from "./dtos/dogResponse.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class DogsService {
  constructor(private prisma: PrismaService) {}

  async getDogs(
    limit: number = 10,
    offset: number = 0
  ): Promise<DogResponseDto[]> {
    try {
      const dogs = await this.prisma.dog.findMany({
        take: limit,
        skip: offset,
      });
      return plainToInstance(DogResponseDto, dogs, {
        excludeExtraneousValues: true,
      });
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
  }): Promise<DogResponseDto> {
    const dog = await this.prisma.dog.create({
      data: dogData,
    });
    return plainToInstance(DogResponseDto, dog, {
      excludeExtraneousValues: true,
    });
  }

  async getDogById(id: number): Promise<DogResponseDto | null> {
    const dog = await this.prisma.dog.findUnique({
      where: { id },
    });
    return dog
      ? plainToInstance(DogResponseDto, dog, {
          excludeExtraneousValues: true,
        })
      : null;
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
  ): Promise<DogResponseDto> {
    const dog = await this.prisma.dog.update({
      where: { id },
      data: dogData,
    });
    return plainToInstance(DogResponseDto, dog, {
      excludeExtraneousValues: true,
    });
  }

  async deleteDog(id: number) {
    return this.prisma.dog.delete({
      where: { id },
    });
  }
}
