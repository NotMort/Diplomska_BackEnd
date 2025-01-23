import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { CommentService } from './comment.service'
import { Comment } from 'entities/comment.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ApiTags } from '@nestjs/swagger'
import { Public } from 'decorators/public.decorator'
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll([])
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() CreateCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(CreateCommentDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Comment> {
    return this.commentService.remove(id)
  }
  @Public()
  @Get('artwork/:artworkId')
  @HttpCode(HttpStatus.OK)
  async findByArtwork(@Param('artworkId') artworkId: string): Promise<Comment[]> {
    return this.commentService.findByArtworkId(artworkId)
  }
}
