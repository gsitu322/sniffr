import { IsEnum, IsNotEmpty, IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwipeStatus } from "@prisma/client";
import { Transform } from "class-transformer";

export class SwipeDto {
  @ApiProperty({
    description: "The ID of the dog being swiped on",
    example: 123,
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsNotEmpty()
  dogId: number;

  @ApiProperty({
    description: "The status of the User's swipe",
    example: SwipeStatus.ACCEPTED,
    enum: SwipeStatus,
  })
  @IsEnum(SwipeStatus)
  @IsNotEmpty()
  userStatus: SwipeStatus;
}
