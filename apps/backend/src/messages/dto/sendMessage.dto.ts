import { IsString, IsNotEmpty, IsInt, IsIn } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty({ description: "The content of the message" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: "The ID of the sender" })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  senderId: number;

  @ApiProperty({ description: "The ID of the receiver" })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  receiverId: number;

  @ApiProperty({ description: "The ID of the message thread" })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  messageThreadId: number;
}
