import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { Favorite } from 'entities/favorite.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { CreateFavoriteDto } from './dto/create-favorite.dto'
import { User } from 'entities/user.entity'
import { Artwork } from 'entities/artwork.entity'

@Injectable()
export class FavoriteService extends AbstractService {
  constructor(
    @InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Artwork) private readonly artworkRepository: Repository<Artwork>,
  ) {
    super(favoriteRepository)
  }

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const { user_id, artwork_id } = createFavoriteDto
    const user = await this.userRepository.findOne({ where: { id: user_id } })
    if (!user) throw new NotFoundException('User not found')
    const artwork = await this.artworkRepository.findOne({ where: { id: artwork_id } })
    if (!artwork) throw new NotFoundException('Artwork not found')
    const favorite = this.favoriteRepository.create({
      user,
      artwork,
    })

    return this.favoriteRepository.save(favorite)
  }

  async deleteByUserAndArtwork(userId: string, artworkId: string): Promise<void> {
    await this.favoriteRepository
      .createQueryBuilder()
      .delete()
      .from(Favorite)
      .where('userId = :userId', { userId })
      .andWhere('artworkId = :artworkId', { artworkId })
      .execute()
  }
  async checkIfFavorited(userId: string, artworkId: string): Promise<{ isFavorited: boolean }> {
    try {
      const favorite = await this.favoriteRepository.findOne({
        where: {
          user: { id: userId },
          artwork: { id: artworkId },
        },
      })

      return { isFavorited: !!favorite }
    } catch (error) {
      throw new InternalServerErrorException('Error checking favorite status.')
    }
  }
}
