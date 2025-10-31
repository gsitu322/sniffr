import { ApiProperty } from "@nestjs/swagger";
import { MessageDto } from "./message.dto";
import { UserResponseDto } from "../../users/dto/userResponse.dto";
import { DogResponseDto } from "../../dogs/dtos/dog-response.dto";

export class ThreadDto {
  @ApiProperty({ description: "Id of the thread (database ID)" })
  id: string;

  @ApiProperty({
    description: "User participant in the thread",
    type: UserResponseDto,
  })
  user?: UserResponseDto;

  @ApiProperty({
    description: "Dog participant in the thread",
    type: DogResponseDto,
  })
  dog?: DogResponseDto;

  @ApiProperty({ description: "Last message of the thread" })
  lastMessage: string;

  @ApiProperty({ description: "Unread count of the thread" })
  unreadCount: number;

  @ApiProperty({ description: "Messages of the thread", type: [MessageDto] })
  messages: MessageDto[];
}
