import { Controller, Get, Inject } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Dog } from "./dogs.entity";

@Controller("dogs")
export class DogsController {
  constructor(@Inject("DATA_SOURCE") private dataSource: DataSource) {}

  @Get()
  async getDogs(): Promise<Dog[]> {
    const dogs = await this.dataSource.getRepository(Dog).find({});
    return dogs;
  }
}
