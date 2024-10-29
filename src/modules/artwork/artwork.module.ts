import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Artwork } from 'entities/artwork.entity'
import { ArtworksController } from './artwork.controller'
import { ArtworkService } from './artwork.service'

@Module({
  imports: [TypeOrmModule.forFeature([Artwork])],
  controllers: [ArtworksController],
  providers: [ArtworkService],
  exports: [ArtworkService],
})
export class ArtworkModule {}
