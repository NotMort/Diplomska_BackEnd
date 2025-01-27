import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Artwork, CategoryType } from 'entities/artwork.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { UpdateArtworkDto } from './dto/update-artwork.dto'
import { CreateArtworkDto } from './dto/create-artwork.dto'
import { User } from 'entities/user.entity'

@Injectable()
export class ArtworkService extends AbstractService {
  constructor(@InjectRepository(Artwork) private readonly artworkRepository: Repository<Artwork>) {
    super(artworkRepository)
  }
  async create(createArtworkDto: CreateArtworkDto): Promise<Artwork> {
    const { user_id, ...artworkData } = createArtworkDto
    const user = await this.artworkRepository.manager.findOne(User, { where: { id: user_id } })
    if (!user) {
      throw new BadRequestException('Invalid user ID')
    }
    const artwork = this.artworkRepository.create({
      ...artworkData,
      user,
    })

    return this.artworkRepository.save(artwork)
  }

  async update(id: string, updateArtworkDto: UpdateArtworkDto): Promise<Artwork> {
    const artwork = await this.findById(id)
    Object.assign(artwork, updateArtworkDto)
    return this.artworkRepository.save(artwork)
  }

  async findByCategory(category: CategoryType): Promise<Artwork[]> {
    return this.artworkRepository.find({ where: { category } })
  }

  async findByTag(tag: string): Promise<Artwork[]> {
    return this.artworkRepository
      .createQueryBuilder('artwork')
      .where('artwork.tags LIKE :tag', { tag: `%${tag}%` })
      .getMany()
  }
}
