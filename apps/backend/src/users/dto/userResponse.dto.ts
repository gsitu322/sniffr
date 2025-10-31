import { ApiProperty } from "@nestjs/swagger";
import { Transform, Expose } from "class-transformer";

export class UserResponseDto {
  @ApiProperty({ description: "Id of the user" })
  @Expose()
  @Transform(({ value }) => String(value))
  id: string;

  @ApiProperty({ description: "Name of the user" })
  @Expose()
  name: string;

  @ApiProperty({ description: "Email of the user" })
  @Expose()
  email: string;
}
