import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { CandidatesService } from "./candidates.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Candidates")
@Controller("candidates")
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) {}

  // Get potential matches (candidates)
  @Get()
  async getCandidates() {
    const result = await this.candidatesService.getCandidates();
    return result;
  }
}
