import { Injectable } from '@nestjs/common';
import { Tag } from './tag.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenreTagDto } from 'src/common/dto';

@Injectable()
export class TagService {

  constructor(@InjectModel(Tag) private tagRepository: typeof Tag){}

  async createTag(dto : CreateGenreTagDto) {
    const tag = await this.tagRepository.create(dto);
    return tag;
  }

}