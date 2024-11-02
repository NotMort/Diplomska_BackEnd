import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Favorite } from 'entities/favorite.entity'
import { FavoritesController } from './favorite.controller'
import { FavoriteService } from './favorite.service'
import { User } from 'entities/user.entity'
import { Artwork } from 'entities/artwork.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Artwork])],
  controllers: [FavoritesController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
