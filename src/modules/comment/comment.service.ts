import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from 'entities/comment.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import Logging from 'library/Logging'

@Injectable()
export class CommentService extends AbstractService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {
    super(commentRepository)
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const newComm = this.commentRepository.create({ ...createCommentDto })
      return this.commentRepository.save(newComm)
    } catch (error) {
      Logging.error(error)
      throw new BadRequestException('somthing went wrong while creating user')
    }
  }
}
