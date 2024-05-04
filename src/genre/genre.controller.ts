import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';

import { Roles } from 'src/common/decorators';
import { RoleGuard } from 'src/common/guards';
import { CreateGenreTagDto } from 'src/common/dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from './genre.model';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {

  constructor(private genreService: GenreService) {}

  @ApiOperation({summary: 'Create genres for anime.'})
  @ApiResponse({status: 200, type: Genre})
  @Roles('admin', 'media_moderator',
  'voice_team_leader', 'voice_team_moderator')
  @UseGuards(RoleGuard)
  @Post('/')
  createGenre(@Body() dto : CreateGenreTagDto | CreateGenreTagDto[]) {
    return this.genreService.getGenreOrCreate(dto);
  }
}