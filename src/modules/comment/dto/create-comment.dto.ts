import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  user_id: string
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  artwork_id: string
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  comment_text: string
}
