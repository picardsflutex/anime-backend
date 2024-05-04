import { Injectable } from '@nestjs/common';
import { Tag } from './tag.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenreTagDto } from 'src/common/dto';

@Injectable()
export class TagService {

  constructor(@InjectModel(Tag) private tagRepository: typeof Tag){}

  async getTagOrCreate(dto : CreateGenreTagDto | CreateGenreTagDto[]) {

    if(Array.isArray(dto)) {
      const uniqueNames = new Set(dto.map(item => item.name));
      const tags = await Promise.all(Array.from(uniqueNames).map(async (name) => {
          const item = dto.find(item => item.name === name);
          const [tag, created] = await this.tagRepository.findOrCreate({
              where: { name: name },
              defaults: item
          });
          return tag;
      }));
      return tags.filter(tag => tag !== null);
    } else {
      const [tag, created] = await this.tagRepository.findOrCreate({
        where: { name: dto.name },
        defaults: dto
      });
      return tag;
    }
  }

}