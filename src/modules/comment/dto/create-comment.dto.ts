import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string

  @IsUUID()
  @IsNotEmpty()
  artwork_id: string

  @IsString()
  @IsNotEmpty()
  comment_text: string
}
