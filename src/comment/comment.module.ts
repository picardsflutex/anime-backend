import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { Comment } from './comment.model'
import { AnimeTitle } from 'src/anime/anime.model';
import { User } from 'src/users/users.model';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [
    SequelizeModule.forFeature([
      Comment,
      AnimeTitle,
      User
    ])
  ]
})
export class CommentModule {}
