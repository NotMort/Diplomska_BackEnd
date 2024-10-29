import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from 'entities/comment.entity'
import { AbstractService } from 'modules/common/abstract.service'

@Injectable()
export class CommentService extends AbstractService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {
    super(commentRepository)
  }
}
