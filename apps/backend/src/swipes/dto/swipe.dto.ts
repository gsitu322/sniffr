import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SwipeDto {
  @ApiProperty({
    description: "The ID of the dog being swiped on",
    example: "123",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  dogId: string;
}

export class AcceptSwipeDto extends SwipeDto {}

export class RejectSwipeDto extends SwipeDto {}
