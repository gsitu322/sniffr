import { Injectable } from "@nestjs/common";

@Injectable()
export class MatchesService {
  async getMatches(limt: number = 10) {
    // Do a databse lookup for where the dogs that the user has not swipped on yet.
  }
}
