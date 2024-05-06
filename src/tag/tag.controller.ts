import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { Roles } from 'src/common/decorators';
import { CreateGenreTagDto } from 'src/common/dto';
import { RoleGuard } from 'src/common/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from './tag.model';

@ApiTags('Tag')
@Controller('tag')
export class TagController {

  constructor(private tagService: TagService) {}

  @ApiOperation({summary: 'Create tag for anime.'})
  @ApiResponse({status: 200, type: Tag})
  @Roles('admin', 'media_moderator',
  'voice_team_leader', 'voice_team_moderator')
  @UseGuards(RoleGuard)
  @Post('/')
  createTag(@Body() dto: string | string[]) {
    return this.tagService.getTagOrCreate(dto);
  }
}
