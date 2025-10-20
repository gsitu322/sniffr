import { Controller, Get, Query } from "@nestjs/common";
import { DogsService } from "./dogs.service";

@Controller("dogs")
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  async getDogs(
    @Query("limit") limit?: string,
    @Query("offset") offset?: string
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const offsetNum = offset ? parseInt(offset, 10) : 0;

    const result = await this.dogsService.getDogs(limitNum, offsetNum);
    return result;
  }
}
