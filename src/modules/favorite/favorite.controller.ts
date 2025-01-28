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
  Query,
  BadRequestException,
} from '@nestjs/common'
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

  @Get('check/user')
  @HttpCode(HttpStatus.OK)
  async checkIfFavorited(
    @Query('user_id') userId: string,
    @Query('artwork_id') artworkId: string,
  ): Promise<{ isFavorited: boolean }> {
    if (!userId || !artworkId) {
      throw new BadRequestException('User ID and Artwork ID are required.')
    }
    return this.favoriteService.checkIfFavorited(userId, artworkId)
  }

  @Delete('delete-by-user-artwork')
  @HttpCode(HttpStatus.OK)
  async deleteByUserAndArtwork(
    @Query('user_id') userId: string,
    @Query('artwork_id') artworkId: string,
  ): Promise<{ message: string }> {
    if (!userId || !artworkId) {
      throw new BadRequestException('User ID and Artwork ID are required.')
    }
    await this.favoriteService.deleteByUserAndArtwork(userId, artworkId)
    return { message: 'Favorite deleted successfully.' }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Favorite> {
    return this.favoriteService.remove(id)
  }
}
