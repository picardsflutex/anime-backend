import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from 'src/common/dto/animeDTOs/create-anime.dto';
import { RoleGuard } from 'src/common/guards';
import { Public, Roles } from 'src/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimeTitle } from './anime.model';

@ApiTags('Anime')
@Controller('anime')
export class AnimeController {

  constructor(private animeService: AnimeService) {}

  @ApiOperation({summary: 'Create new anime page.'})
  @ApiResponse({status: 200, type: AnimeTitle})
  @Public()
  @Get('/:id')
  getAnime(@Param('id') id: number) {
    return this.animeService.getAnime(id);
  }

  @ApiOperation({summary: 'Create new anime page.'})
  @ApiResponse({status: 200, type: AnimeTitle})
  @Post('/create')
  @Roles('admin', 'media_moderator',
  'voice_team_leader', 'voice_team_moderator')
  @UseGuards(RoleGuard)
  createAnime(@Body() dto: CreateAnimeDto) {
    return this.animeService.createAnime(dto);
  }
}
