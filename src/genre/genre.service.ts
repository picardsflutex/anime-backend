import { Injectable } from '@nestjs/common';
import { Genre } from './genre.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenreTagDto } from 'src/common/dto';

@Injectable()
export class GenreService {

  constructor(@InjectModel(Genre) private genreRepository: typeof Genre){}

  async getGenreOrCreate(dto : CreateGenreTagDto | CreateGenreTagDto[]) {
    if(Array.isArray(dto)) {
      const uniqueNames = new Set(dto.map(item => item.name));
      const genres = await Promise.all(Array.from(uniqueNames).map(async (name) => {
          const item = dto.find(item => item.name === name);
          const [genre, created] = await this.genreRepository.findOrCreate({
              where: { name: name },
              defaults: item
          });
          return genre;
      }));
      return genres.filter(genre => genre !== null);
    } else {
      const [genre, created] = await this.genreRepository.findOrCreate({
        where: { name: dto.name },
        defaults: dto
      });
      return genre;
    }
  }
}
