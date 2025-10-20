import { Injectable } from "@nestjs/common";

@Injectable()
export class SwipesService {
  async accept(dogId: string) {
    // Store the swipe in the database.
  }

  async reject(dogId: string) {}
}
