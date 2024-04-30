import { Module, forwardRef } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from 'src/auth/auth.module';

import { Genre } from './genre.model';
import { AnimeTitle } from 'src/anime/anime.model';
import { AnimeGenre } from './genre-anime.model';

@Module({
  providers: [GenreService],
  controllers: [GenreController],
  imports: [
    SequelizeModule.forFeature([
      Genre,
      AnimeTitle,
      AnimeGenre
    ]),
    forwardRef(() => AuthModule)
  ]
})
export class GenreModule {}
