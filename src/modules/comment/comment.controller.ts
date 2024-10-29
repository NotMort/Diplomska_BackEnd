import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { CommentService } from './comment.service'
import { Comment } from 'entities/comment.entity'

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
  async create(@Body() createcommentDto): Promise<Comment> {
    return this.commentService.create(createcommentDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updatecommentDto): Promise<Comment> {
    return this.commentService.update(id, updatecommentDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Comment> {
    return this.commentService.remove(id)
  }
}
