import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Favorite } from 'entities/favorite.entity'
import { AbstractService } from 'modules/common/abstract.service'

@Injectable()
export class FavoriteService extends AbstractService {
  constructor(@InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>) {
    super(favoriteRepository)
  }
}
