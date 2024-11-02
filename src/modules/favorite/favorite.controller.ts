import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { FavoriteService } from './favorite.service'
import { Favorite } from 'entities/favorite.entity'
import { ApiTags } from '@nestjs/swagger'
import { CreateFavoriteDto } from './dto/create-favorite.dto'
@ApiTags('favorites')
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
  async create(@Body() createfavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoriteService.create(createfavoriteDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Favorite> {
    return this.favoriteService.remove(id)
  }
}
