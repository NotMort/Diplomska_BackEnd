import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class UpdateArtworkDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  title?: string
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  description?: string
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  file_path?: string
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  image_path?: string
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  thumbnail_path?: string
  @ApiProperty({ required: true })
  @IsEnum(['2D', '3D', 'photo', 'audio', 'video'])
  @IsOptional()
  category?: '2D' | '3D' | 'photo' | 'audio' | 'video'
  @ApiProperty({ required: true })
  @IsOptional()
  tags?: string[]
}
