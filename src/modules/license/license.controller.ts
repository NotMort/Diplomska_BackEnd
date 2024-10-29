import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { LicenseService } from './license.service'
import { License } from 'entities/license.entity'

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
  async create(@Body() createLicenseDto): Promise<License> {
    return this.licenseService.create(createLicenseDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateLicenseDto): Promise<License> {
    return this.licenseService.update(id, updateLicenseDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<License> {
    return this.licenseService.remove(id)
  }
}
