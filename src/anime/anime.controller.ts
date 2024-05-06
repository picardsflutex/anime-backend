import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from 'src/common/dto';
import { RoleGuard } from 'src/common/guards';
import { Public, Roles } from 'src/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimeTitle } from './anime.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtPayload } from 'src/common/types';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: JwtPayload; 
  }
}

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

  @Roles('admin', 'media_moderator', 'voice_team_leader', 'voice_team_moderator')
  @UseGuards(RoleGuard)
  @ApiOperation({summary: 'Create new anime page.'})
  @ApiResponse({status: 200, type: AnimeTitle})
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  createAnime(
    @Req() req: Request,
    @Body() dto: CreateAnimeDto,
    @UploadedFile() image
  ) {
    return this.animeService.createAnime(dto, image, req.user.user_id);
  }
}
