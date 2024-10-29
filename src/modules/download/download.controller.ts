import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { DownloadService } from './download.service'
import { Download } from 'entities/download.entity'

@Controller('downloads')
export class DownloadsController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Download[]> {
    return this.downloadService.findAll([])
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Download> {
    return this.downloadService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createdownloadDto): Promise<Download> {
    return this.downloadService.create(createdownloadDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updatedownloadDto): Promise<Download> {
    return this.downloadService.update(id, updatedownloadDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Download> {
    return this.downloadService.remove(id)
  }
}