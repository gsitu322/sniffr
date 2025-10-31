import { ApiProperty } from "@nestjs/swagger";
import { MessageDto } from "./message.dto";

export class ThreadDto {
  @ApiProperty({ description: "Id of the thread (database ID)" })
  id: string;

  @ApiProperty({ description: "Name of the dog" })
  dogName: string;

  @ApiProperty({ description: "Image of the dog" })
  dogImage: string;

  @ApiProperty({ description: "Last message of the thread" })
  lastMessage: string;

  @ApiProperty({ description: "Unread count of the thread" })
  unreadCount: number;

  @ApiProperty({ description: "Messages of the thread", type: [MessageDto] })
  messages: MessageDto[];
}
