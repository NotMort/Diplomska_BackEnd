import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from 'entities/comment.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import Logging from '../../library/logging'

@Injectable()
export class CommentService extends AbstractService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {
    super(commentRepository)
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const { user_id, artwork_id, comment_text } = createCommentDto

      const newComment = this.commentRepository.create({
        comment_text,
        user: { id: user_id },
        artwork: { id: artwork_id },
      })

      return this.commentRepository.save(newComment)
    } catch (error) {
      Logging.error(error)
      throw new BadRequestException('Something went wrong while creating the comment.')
    }
  }
  async findByArtworkId(artworkId: string): Promise<Comment[]> {
    try {
      return this.commentRepository.find({
        where: { artwork: { id: artworkId } },
        relations: ['user'],
      })
    } catch (error) {
      Logging.error(error)
      throw new BadRequestException('Failed to fetch comments for the artwork.')
    }
  }
}
