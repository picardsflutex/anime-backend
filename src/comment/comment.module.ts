import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { AnimeComment } from './comment-anime.model';
import { AnimeTitle } from 'src/anime/anime.model';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [
    SequelizeModule.forFeature([
      Comment,
      AnimeTitle,
      AnimeComment
    ])
  ]
})
export class CommentModule {}
