import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateFavoriteDto {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  user_id: string
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  artwork_id: string
}
