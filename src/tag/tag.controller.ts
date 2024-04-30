import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { Roles } from 'src/common/decorators';
import { CreateGenreTagDto } from 'src/common/dto';
import { RoleGuard } from 'src/common/guards';

@Controller('tag')
export class TagController {

  constructor(private tagService: TagService) {}

  @Roles('admin', 'media_moderator',
  'voice_team_leader', 'voice_team_moderator')
  @UseGuards(RoleGuard)
  @Post('/')
  createTag(@Body() dto: CreateGenreTagDto) {
    return this.tagService.createTag(dto);
  }
}
