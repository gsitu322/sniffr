import { Controller, Body, Post } from "@nestjs/common";
import { SwipesService } from "./swipes.service";
import { AcceptSwipeDto, RejectSwipeDto } from "./dto/swipe.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Swipes")
@Controller("swipes")
export class SwipesController {
  constructor(private swipesService: SwipesService) {}

  @Post("accept")
  @ApiOperation({ summary: "Accept a dog swipe" })
  @ApiResponse({ status: 200, description: "Dog swipe accepted successfully" })
  accept(@Body() body: AcceptSwipeDto) {
    return this.swipesService.accept(body.dogId, 1);
  }

  @Post("reject")
  @ApiOperation({ summary: "Reject a dog swipe" })
  @ApiResponse({ status: 200, description: "Dog swipe rejected successfully" })
  reject(@Body() body: RejectSwipeDto) {
    return this.swipesService.reject(body.dogId, 1);
  }
}
