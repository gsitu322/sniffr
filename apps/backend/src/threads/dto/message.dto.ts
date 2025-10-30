import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {
  @ApiProperty({ description: "Id of the message (as string)" })
  id: string;

  @ApiProperty({ description: "Content of the message" })
  content: string;

  @ApiProperty({ description: "Id of the sender (as string)" })
  senderId: string;

  @ApiProperty({ description: "Timestamp of the message (ISO string)" })
  timestamp: string;

  @ApiProperty({ description: "Read status of the message" })
  read: boolean;
}
