import { Injectable } from '@nestjs/common';
import { Genre } from './genre.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenreTagDto } from 'src/common/dto';

@Injectable()
export class GenreService {

  constructor(@InjectModel(Genre) private genreRepository: typeof Genre){}

  async createGenre(dto : CreateGenreTagDto) {
    const genre = await this.genreRepository.create(dto);
    return genre;
  }
}
