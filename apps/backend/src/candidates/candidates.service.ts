import { Injectable } from "@nestjs/common";

@Injectable()
export class CandidatesService {
  async getCandidates(limit: number = 10) {
    // Do a database lookup for dogs that the user has not swiped on yet.
  }
}
