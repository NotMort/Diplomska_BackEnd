import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Download } from 'entities/download.entity'
import { User } from 'entities/user.entity'
import { Artwork } from 'entities/artwork.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { CreateDownloadDto } from './dto/create-download.dto'

@Injectable()
export class DownloadService extends AbstractService {
  constructor(
    @InjectRepository(Download) private readonly downloadRepository: Repository<Download>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Artwork) private readonly artworkRepository: Repository<Artwork>,
  ) {
    super(downloadRepository)
  }

  async create(createDownloadDto: CreateDownloadDto): Promise<Download> {
    const { user_id, artwork_id } = createDownloadDto
    const user = await this.userRepository.findOne({ where: { id: user_id } })
    if (!user) throw new NotFoundException('User not found')
    const artwork = await this.artworkRepository.findOne({ where: { id: artwork_id } })
    if (!artwork) throw new NotFoundException('Artwork not found')
    const download = this.downloadRepository.create({
      user,
      artwork,
    })

    return this.downloadRepository.save(download)
  }

  async getDownloadCount(artworkId: string): Promise<{ count: number }> {
    const artwork = await this.artworkRepository.findOne({ where: { id: artworkId } })
    if (!artwork) throw new NotFoundException('Artwork not found')

    const count = await this.downloadRepository.count({ where: { artwork: { id: artworkId } } })
    return { count }
  }
}
