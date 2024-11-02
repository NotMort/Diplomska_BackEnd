import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export class UpdateLicenseDto {
  @ApiProperty({ required: false })
  @IsEnum(['CC BY', 'CC BY-SA', 'CC BY-NC', 'CC BY-ND', 'GPL', 'Copyright', 'Public Domain'])
  @IsOptional()
  license_type?: 'CC BY' | 'CC BY-SA' | 'CC BY-NC' | 'CC BY-ND' | 'GPL' | 'Copyright' | 'Public Domain'
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  commercial_use?: boolean
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  modification_allowed?: boolean
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  attribution_required?: boolean
}
