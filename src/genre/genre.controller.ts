import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';

import { Roles } from 'src/common/decorators';
import { RoleGuard } from 'src/common/guards';
import { CreateGenreTagDto } from 'src/common/dto';

@Controller('genre')
export class GenreController {

  constructor(private genreService: GenreService) {}

  @Roles('admin', 'media_moderator',
  'voice_team_leader', 'voice_team_moderator')
  @UseGuards(RoleGuard)
  @Post('/')
  createGenre(@Body() dto: CreateGenreTagDto) {
    return this.genreService.createGenre(dto);
  }
}
