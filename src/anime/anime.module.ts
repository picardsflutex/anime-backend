import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { AnimeTitle } from './anime.model';
import { Tag } from 'src/tag/tag.model';
import { Genre } from 'src/genre/genre.model';
import { Comment } from 'src/comment/comment.model';
import { AnimeTag } from 'src/tag/tag-anime.model';
import { AnimeGenre } from 'src/genre/genre-anime.model';
import { AnimeComment } from 'src/comment/comment-anime.model';

@Module({
  providers: [AnimeService],
  controllers: [AnimeController],
  imports: [
    SequelizeModule.forFeature([
      AnimeTitle,
      Tag,
      Genre,
      Comment,
      AnimeTag,
      AnimeGenre,
      AnimeComment
    ])
  ]
})
export class AnimeModule {}
