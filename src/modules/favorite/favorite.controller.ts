import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { FavoriteService } from './favorite.service'
import { Favorite } from 'entities/favorite.entity'

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Favorite[]> {
    return this.favoriteService.findAll([])
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Favorite> {
    return this.favoriteService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createfavoriteDto): Promise<Favorite> {
    return this.favoriteService.create(createfavoriteDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updatefavoriteDto): Promise<Favorite> {
    return this.favoriteService.update(id, updatefavoriteDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Favorite> {
    return this.favoriteService.remove(id)
  }
}
