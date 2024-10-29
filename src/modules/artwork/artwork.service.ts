import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Artwork } from 'entities/artwork.entity'
import { AbstractService } from 'modules/common/abstract.service'

@Injectable()
export class ArtworkService extends AbstractService {
  constructor(@InjectRepository(Artwork) private readonly artworkRepository: Repository<Artwork>) {
    super(artworkRepository)
  }
}
