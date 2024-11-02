import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateLicenseDto {
  @IsEnum(['CC BY', 'CC BY-SA', 'CC BY-NC', 'CC BY-ND', 'GPL', 'Copyright', 'Public Domain'])
  @IsNotEmpty()
  license_type: 'CC BY' | 'CC BY-SA' | 'CC BY-NC' | 'CC BY-ND' | 'GPL' | 'Copyright' | 'Public Domain'

  @IsString()
  @IsNotEmpty()
  description: string

  @IsBoolean()
  @IsNotEmpty()
  commercial_use: boolean

  @IsBoolean()
  @IsNotEmpty()
  modification_allowed: boolean

  @IsBoolean()
  @IsNotEmpty()
  attribution_required: boolean
}
