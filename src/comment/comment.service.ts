import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CreateCommentDto } from 'src/common/dto';

@Injectable()
export class CommentService {

  constructor(@InjectModel(Comment) private commentRepository: typeof Comment){}

  async createComment(dto: CreateCommentDto) {
    return this.commentRepository.create(dto);
  }
}
