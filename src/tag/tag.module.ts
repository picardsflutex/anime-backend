import { Module, forwardRef } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { Tag } from './tag.model';
import { AnimeTitle } from 'src/anime/anime.model';
import { AnimeTag } from './tag-anime.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TagService],
  controllers: [TagController],
  imports: [
    SequelizeModule.forFeature([
      Tag,
      AnimeTitle,
      AnimeTag
    ]),
    forwardRef(() => AuthModule)
  ]
})
export class TagModule {}
