import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CandidatesService } from "./candidates.service";
import { SwipeStatus } from "@prisma/client";
import { GetCandidatesDto } from "./dtos/getCandidates.dtos";

@ApiTags("Candidates")
@Controller("candidates")
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) {}

  // Get potential matches (candidates)
  @Get()
  async getCandidates() {
    const result = await this.candidatesService.getCandidates(1);
    return result;
  }

  @Get(":status")
  async getCandidatesByStatus(@Param("status") status: SwipeStatus) {
    const results = await this.candidatesService.getCandidatesByStatus(
      1,
      status
    );

    return results;
  }
}
