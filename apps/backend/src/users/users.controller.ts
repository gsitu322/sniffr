import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrismaService } from "src/prisma/prisma.service";
import { UserResponseDto } from "./dto/userResponse.dto";
import { plainToInstance } from "class-transformer";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get("")
  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.prismaService.user.findMany();

    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }
}
