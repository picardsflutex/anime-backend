import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/common/guards';
import { CreateCommentDto } from 'src/common/dto';
import { Comment } from './comment.model';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  
  constructor(private commentService: CommentService){}

  @ApiOperation({summary: 'Send comment for anime from users.'})
  @ApiResponse({status: 200, type: Comment})
  @UseGuards(AtGuard)
  @Post('/')
  setRole(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }
}