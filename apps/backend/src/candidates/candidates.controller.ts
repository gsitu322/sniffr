import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CandidatesService } from "./candidates.service";

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
}
