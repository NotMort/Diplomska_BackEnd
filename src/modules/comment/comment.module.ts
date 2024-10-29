import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from 'entities/comment.entity'
import { CommentsController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [CommentService],
})
export class commentModule {}
