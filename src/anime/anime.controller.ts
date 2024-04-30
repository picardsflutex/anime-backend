import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from 'src/common/dto/animeDTOs/create-anime.dto';
import { RoleGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators';

@Controller('anime')
export class AnimeController {

  constructor(private animeService: AnimeService) {}

  @Post('/')
  @Roles('admin', 'media_moderator',
  'voice_team_leader', 'voice_team_moderator')
  @UseGuards(RoleGuard)
  createAnime(@Body() dto: CreateAnimeDto) {
    return this.animeService.createAnime(dto);
  }
}
