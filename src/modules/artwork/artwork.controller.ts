import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ArtworkService } from './artwork.service'
import { Artwork, CategoryType } from 'entities/artwork.entity'

@Controller('artworks')
export class ArtworksController {
  constructor(private readonly artworkService: ArtworkService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Artwork[]> {
    return this.artworkService.findAll([])
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Artwork> {
    return this.artworkService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtworkDto): Promise<Artwork> {
    return this.artworkService.create(createArtworkDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateArtworkDto): Promise<Artwork> {
    return this.artworkService.update(id, updateArtworkDto)
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
}
