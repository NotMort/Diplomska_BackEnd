import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateArtworkDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  file_path: string
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  image_path: string
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  thumbnail_path?: string
  @ApiProperty({ required: true })
  @IsEnum(['2D', '3D', 'photo', 'audio', 'video'])
  category: '2D' | '3D' | 'photo' | 'audio' | 'video'
  @ApiProperty({ required: true })
  @IsOptional()
  tags?: string[]
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  user_id: string
}
