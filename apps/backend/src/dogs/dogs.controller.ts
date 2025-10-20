import { Controller, Get, Query } from "@nestjs/common";
import { DogsService } from "./dogs.service";
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

@ApiTags("Dogs")
@Controller("dogs")
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @ApiOperation({ summary: "Get list of dogs" })
  @ApiQuery({ name: "limit", type: Number, required: false, example: 10 })
  @ApiQuery({ name: "offset", type: Number, required: false, example: 0 })
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
