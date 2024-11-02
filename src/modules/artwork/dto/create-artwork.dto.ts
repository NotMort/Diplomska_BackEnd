import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateArtworkDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  file_path: string

  @IsString()
  @IsNotEmpty()
  image_path: string

  @IsString()
  @IsOptional()
  thumbnail_path?: string

  @IsEnum(['2D', '3D', 'photo', 'audio', 'video'])
  category: '2D' | '3D' | 'photo' | 'audio' | 'video'

  @IsOptional()
  tags?: string[]
}
