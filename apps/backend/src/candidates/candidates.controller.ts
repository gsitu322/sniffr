import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CandidatesService } from "./candidates.service";
import { SwipeStatus } from "@prisma/client";

@ApiTags("Candidates")
@Controller("candidates")
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) {}


  @ApiOperation({ summary: "Get potential matches (candidates)" })
  @Get()
  async getCandidates() {
    const result = await this.candidatesService.getCandidates(1);
    return result;
  }

  @ApiOperation({ summary: "Get swipped matches by status" })
  @Get(":status")
  async getCandidatesByStatus(@Param("status") status: SwipeStatus) {
    const results = await this.candidatesService.getCandidatesByStatus(
      1,
      status
    );

    return results;
  }
}
