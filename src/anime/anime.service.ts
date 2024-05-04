import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnimeTitle } from './anime.model';
import { CreateAnimeDto } from 'src/common/dto/animeDTOs/create-anime.dto';
import { Genre } from 'src/genre/genre.model';
import { Tag } from 'src/tag/tag.model';
import { Comment } from 'src/comment/comment.model';

@Injectable()
export class AnimeService {

  constructor(@InjectModel(AnimeTitle) private animeRepository: typeof AnimeTitle){}

  async createAnime(dto: CreateAnimeDto) {
    const anime = await this.animeRepository.create(dto);
    return anime;
  }

  async getAnime(id: number) {
    const anime = await this.animeRepository.findByPk(id, {
      include: [
        {
          model: Genre,
          as: 'genres'
        },
        {
          model: Tag,
          as: 'tags'
        },
        {
          model: Comment,
          as: 'comments'
        }
      ]
    });
    return anime;
  }
}
