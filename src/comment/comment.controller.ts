import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/common/guards';
import { CreateCommentDto, DeleteCommentDto } from 'src/common/dto';
import { Comment } from './comment.model';
import { GetCurrentUser } from 'src/common/decorators';
import { User } from 'src/users/users.model';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: 'Send comment for anime from users.' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(AtGuard)
  @Post('/:id')
  createComment(@GetCurrentUser() user: User, @Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto, user.user_id);
  }

  @ApiOperation({ summary: 'Delete comment.' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(AtGuard)
  @Delete('/')
  deleteComment(@GetCurrentUser() user: User, @Body() dto: DeleteCommentDto) {

    return this.commentService.deleteComment(dto, user);
  }
}
