import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common'
import { ArtworkService } from './artwork.service'
import { Artwork, CategoryType } from 'entities/artwork.entity'
import { ApiTags } from '@nestjs/swagger'
import { CreateArtworkDto } from './dto/create-artwork.dto'
import { UpdateArtworkDto } from './dto/update-artwork.dto'
import { Public } from 'decorators/public.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { saveFileToStorage, saveImageToStorage } from 'helpers/imageStorage'

@ApiTags('artworks')
@Controller('artworks')
export class ArtworksController {
  constructor(private readonly artworkService: ArtworkService) {}
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Artwork[]> {
    return this.artworkService.findAll([])
  }
  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Artwork> {
    return this.artworkService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtworkDto: CreateArtworkDto): Promise<Artwork> {
    return this.artworkService.create(createArtworkDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateArtworkDto: UpdateArtworkDto): Promise<Artwork> {
    return this.artworkService.update(id, updateArtworkDto)
  }
  @Patch(':id/license')
  @HttpCode(HttpStatus.OK)
  async updateLicense(@Param('id') id: string, @Body('license_id') licenseId: string): Promise<Artwork> {
    return this.artworkService.updateLicense(id, licenseId)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Artwork> {
    return this.artworkService.remove(id)
  }

  @Get('category/:category')
  @HttpCode(HttpStatus.OK)
  async getByCategory(@Param('category') category: CategoryType): Promise<Artwork[]> {
    return this.artworkService.findByCategory(category)
  }

  @Get('tag/:tag')
  @HttpCode(HttpStatus.OK)
  async getByTag(@Param('tag') tag: string): Promise<Artwork[]> {
    return this.artworkService.findByTag(tag)
  }
  @Patch('upload/thumbnail/:id')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage('thumbnails')))
  @HttpCode(HttpStatus.CREATED)
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    if (!file) throw new BadRequestException('Invalid file')
    return this.artworkService.updateArtworkThumbnail(id, file.filename)
  }

  @Patch('upload/image/:id')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage('images')))
  @HttpCode(HttpStatus.CREATED)
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    if (!file) throw new BadRequestException('Invalid file')
    return this.artworkService.updateArtworkImage(id, file.filename)
  }

  @Patch('upload/file/:id')
  @UseInterceptors(FileInterceptor('file', saveFileToStorage))
  @HttpCode(HttpStatus.CREATED)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    if (!file) throw new BadRequestException('Invalid file')
    return this.artworkService.updateArtworkFile(id, file.filename)
  }
}
