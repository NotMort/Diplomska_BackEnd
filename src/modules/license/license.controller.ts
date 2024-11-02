import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { LicenseService } from './license.service'
import { License, LicenseType } from 'entities/license.entity'
import { ApiTags } from '@nestjs/swagger'
import { CreateLicenseDto } from './dto/create-license.dto'
import { UpdateLicenseDto } from './dto/update-license.dto'
@ApiTags('licenses')
@Controller('licenses')
export class LicensesController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<License[]> {
    return this.licenseService.findAll([])
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<License> {
    return this.licenseService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLicenseDto: CreateLicenseDto): Promise<License> {
    return this.licenseService.create(createLicenseDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto): Promise<License> {
    return this.licenseService.update(id, updateLicenseDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<License> {
    return this.licenseService.remove(id)
  }
  @Get('type/:license_type')
  @HttpCode(HttpStatus.OK)
  async getByType(@Param('license_type') license_type: LicenseType): Promise<License[]> {
    return this.licenseService.findByType(license_type)
  }
}
