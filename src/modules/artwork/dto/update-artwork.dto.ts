import { IsEnum, IsOptional, IsString } from 'class-validator'

export class UpdateArtworkDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  file_path?: string

  @IsString()
  @IsOptional()
  image_path?: string

  @IsString()
  @IsOptional()
  thumbnail_path?: string

  @IsEnum(['2D', '3D', 'photo', 'audio', 'video'])
  @IsOptional()
  category?: '2D' | '3D' | 'photo' | 'audio' | 'video'

  @IsOptional()
  tags?: string[]
}
