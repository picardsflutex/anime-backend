import { Injectable } from '@nestjs/common';
import { Tag } from './tag.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenreTagDto } from 'src/common/dto';

@Injectable()
export class TagService {

  constructor(@InjectModel(Tag) private tagRepository: typeof Tag){}

  async getTagOrCreate(dto: string | string[]): Promise<Tag[]> {
    const names = Array.isArray(dto) ? Array.from(new Set(dto)) : [dto];
    const tags = await Promise.all(names.map(async name => {
      const [tag] = await this.tagRepository.findOrCreate({
        where: { name },
        defaults: { name }
      });
      return tag;
    }));
    return tags.filter(tag => tag !== null);
}

}