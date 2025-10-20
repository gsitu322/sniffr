import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Matches")
@Controller("matches")
export class MatchesController {
  constructor(private matchesService: MatchesService) {}
  // Get matches
  @Get()
  async getMatches() {
    const result = await this.matchesService.getMatches();
    return result;
  }
}
