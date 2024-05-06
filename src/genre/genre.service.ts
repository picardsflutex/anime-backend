import { Injectable } from '@nestjs/common';
import { Genre } from './genre.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenreTagDto } from 'src/common/dto';

@Injectable()
export class GenreService {

  constructor(@InjectModel(Genre) private genreRepository: typeof Genre){}

  async getGenreOrCreate(dto : string | string[]): Promise<Genre[]> {
    const names = Array.isArray(dto) ? Array.from(new Set(dto)) : [dto];
    const genres = await Promise.all(names.map(async name => {
      const [genre] = await this.genreRepository.findOrCreate({
        where: { name },
        defaults: { name }
      });
      return genre;
    }));
    return genres.filter(genre => genre !== null);
  }
}
