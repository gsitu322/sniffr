import { Controller, Body, Post } from "@nestjs/common";
import { SwipesService } from "./swipes.service";
import { SwipeDto } from "./dto/swipe.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Swipes")
@Controller("swipes")
export class SwipesController {
  constructor(private swipesService: SwipesService) {}

  @Post()
  @ApiOperation({ summary: "Create a swipe" })
  @ApiResponse({ status: 200, description: "Logged swipe successfully" })
  createSwipe(@Body() body: SwipeDto) {
    return this.swipesService.create(body, 1);
  }
}
