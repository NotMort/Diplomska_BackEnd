import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export class UpdateLicenseDto {
  @IsEnum(['CC BY', 'CC BY-SA', 'CC BY-NC', 'CC BY-ND', 'GPL', 'Copyright', 'Public Domain'])
  @IsOptional()
  license_type?: 'CC BY' | 'CC BY-SA' | 'CC BY-NC' | 'CC BY-ND' | 'GPL' | 'Copyright' | 'Public Domain'

  @IsString()
  @IsOptional()
  description?: string

  @IsBoolean()
  @IsOptional()
  commercial_use?: boolean

  @IsBoolean()
  @IsOptional()
  modification_allowed?: boolean

  @IsBoolean()
  @IsOptional()
  attribution_required?: boolean
}
