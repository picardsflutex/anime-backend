import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { Tag } from './tag.model';
import { AnimeTitle } from 'src/anime/anime.model';
import { AnimeTag } from './tag-anime.model';

@Module({
  providers: [TagService],
  controllers: [TagController],
  imports: [
    SequelizeModule.forFeature([
      Tag,
      AnimeTitle,
      AnimeTag
    ])
  ]
})
export class TagModule {}
