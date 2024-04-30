import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AtGuard } from 'src/common/guards';
import { CreateCommentDto } from 'src/common/dto';

@Controller('comment')
export class CommentController {
  
  constructor(private commentService: CommentService){}

  @ApiOperation({summary: 'Create comment gor anime.'})
  @ApiResponse({status: 200, type: CreateCommentDto})
  @UseGuards(AtGuard)
  @Post('/')
  setRole(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }
}