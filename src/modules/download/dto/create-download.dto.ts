import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateDownloadDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string

  @IsUUID()
  @IsNotEmpty()
  artwork_id: string
}
