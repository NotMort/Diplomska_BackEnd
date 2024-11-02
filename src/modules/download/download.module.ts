import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Download } from 'entities/download.entity'
import { User } from 'entities/user.entity'
import { Artwork } from 'entities/artwork.entity'
import { DownloadsController } from './download.controller'
import { DownloadService } from './download.service'

@Module({
  imports: [TypeOrmModule.forFeature([Download, User, Artwork])],
  controllers: [DownloadsController],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
