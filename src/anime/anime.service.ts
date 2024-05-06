import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AnimeTitle } from './anime.model';

import { Genre } from 'src/genre/genre.model';
import { Tag } from 'src/tag/tag.model';
import { Comment } from 'src/comment/comment.model';

import { FilesService } from 'src/files/files.service';
import { TagService } from 'src/tag/tag.service';
import { GenreService } from 'src/genre/genre.service';

import { CreateGenreTagDto, CreateAnimeDto } from 'src/common/dto';

@Injectable()
export class AnimeService {

  constructor(
    @InjectModel(AnimeTitle) private animeRepository: typeof AnimeTitle,
    private fileService: FilesService,
    private tagService: TagService,
    private genreService: GenreService
  ){}

  async createAnime(dto: CreateAnimeDto, image: any, user_id:number) {
    try {
      const fileName = await this.fileService.createFile(image);
      const { tags, genres, ...newDto} = dto
      const getTags = await this.tagService.getTagOrCreate(tags)
      const getGenres = await this.genreService.getGenreOrCreate(genres)
      const anime = await this.animeRepository.create({
        ...newDto,
        imagePath: fileName,
        user_id
      });
      anime.$set('tags', getTags)
      anime.$set('genres', getGenres)
      return anime;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Current anime is already exist');
      } else {
        throw error;
      }
    }
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
