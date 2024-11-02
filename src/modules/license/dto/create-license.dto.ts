import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateLicenseDto {
  @ApiProperty({ required: true })
  @IsEnum(['CC BY', 'CC BY-SA', 'CC BY-NC', 'CC BY-ND', 'GPL', 'Copyright', 'Public Domain'])
  @IsNotEmpty()
  license_type: 'CC BY' | 'CC BY-SA' | 'CC BY-NC' | 'CC BY-ND' | 'GPL' | 'Copyright' | 'Public Domain'

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  commercial_use: boolean

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  modification_allowed: boolean

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  attribution_required: boolean
}
