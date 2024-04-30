import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnimeTitle } from './anime.model';
import { CreateAnimeDto } from 'src/common/dto/animeDTOs/create-anime.dto';

@Injectable()
export class AnimeService {

  constructor(@InjectModel(AnimeTitle) private animeRepository: typeof AnimeTitle){}

  async createAnime(dto: CreateAnimeDto) {
    const anime = await this.animeRepository.create(dto);
    return anime;
  }
}
