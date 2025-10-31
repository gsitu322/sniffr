import { ApiProperty } from "@nestjs/swagger";
import { Transform, Expose } from "class-transformer";

export class DogResponseDto {
  @ApiProperty({ description: "Id of the dog" })
  @Expose()
  @Transform(({ value }) => String(value))
  id: string;

  @ApiProperty({ description: "Name of the dog" })
  @Expose()
  name: string;

  @ApiProperty({ description: "Sex of the dog" })
  @Expose()
  sex: string;

  @ApiProperty({ description: "Breed of the dog" })
  @Expose()
  breed: string;

  @ApiProperty({ description: "Age of the dog" })
  @Expose()
  age: number;

  @ApiProperty({ description: "Bio of the dog" })
  @Expose()
  bio: string;

  @ApiProperty({ description: "Image URL of the dog" })
  @Expose()
  image: string;

  @ApiProperty({ description: "Location of the dog", required: false })
  @Expose()
  @Transform(({ value }) => value ?? undefined)
  location?: string;
}
