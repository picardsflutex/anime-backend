import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CreateCommentDto, DeleteCommentDto } from 'src/common/dto';
import { JwtPayload } from 'src/common/types';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async createComment(dto: CreateCommentDto, user_id: number) {
    return this.commentRepository.create({ user_id, ...dto });
  }

  async deleteComment(dto: DeleteCommentDto, user: JwtPayload) {
    const comment = await this.commentRepository.findByPk(dto.comment_id);
    if (
      user.role !== 'site_moderator' &&
      user.role !== 'admin' &&
      user.user_id !== comment.user_id
    ) {
      throw new NotAcceptableException({ message: 'Access denied.' });
    }
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    await comment.destroy();
  }
}
