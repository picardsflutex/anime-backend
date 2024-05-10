import { Table, Column, Model, DataType, HasMany, BelongsToMany, BelongsTo, ForeignKey, IsArray } from 'sequelize-typescript';

import { AnimeGenre } from 'src/genre/genre-anime.model';
import { AnimeTag } from 'src/tag/tag-anime.model';
import { AnimeRelation } from './anime-relation.model';

import { User } from 'src/users/users.model';
import { Comment } from 'src/comment/comment.model';
import { Genre } from 'src/genre/genre.model';
import { Tag } from 'src/tag/tag.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

interface AnimeCreationAttrs{
  englishTitle: string;
  releaseYear: number;
  genres?: Genre[];
  tags?: Tag[];
  description: string;
  imagePath?: string;
  episodesTotal: number;
  user_id: number;
}

@Table({tableName:'animes'})
export class AnimeTitle extends Model<AnimeTitle, AnimeCreationAttrs> {
  
  @ApiProperty({example: 1, description: 'Unique identifier'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  anime_id: number;

  @ApiProperty({example: "Englesh title", description: 'Title of anime'})
  @IsString()
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  englishTitle: string;

  @ApiProperty({example: "Original title", description: 'Original title of anime'})
  @IsString()
  @Column({type: DataType.STRING, unique: true})
  originalTitle: string;

  @ApiProperty({example: 2024, description: 'Year of release'})
  @IsNumber()
  @Column({type: DataType.INTEGER, allowNull: false})
  releaseYear: number;

  @ApiProperty({example: [{
    "genre_id": 1,
    "name": "genre1",
    "createdAt": "2024-05-06T09:55:10.290Z",
    "updatedAt": "2024-05-06T09:55:10.290Z",
    "AnimeGenre": {
      "id": 1,
      "anime_id": 1,
      "genre_id": 1
    }
  },
  {
    "genre_id": 2,
    "name": "genre2",
    "createdAt": "2024-05-06T09:55:10.291Z",
    "updatedAt": "2024-05-06T09:55:10.291Z",
    "AnimeGenre": {
      "id": 2,
      "anime_id": 1,
      "genre_id": 2
    }
  }], description: 'genres'})
  @BelongsToMany(() => Genre, () => AnimeGenre)
  genres: Genre[]

  @ApiProperty({example: [{
    "tag_id": 1,
    "name": "tag1",
    "createdAt": "2024-05-06T09:55:10.274Z",
    "updatedAt": "2024-05-06T09:55:10.274Z",
    "AnimeTag": {
      "id": 1,
      "anime_id": 1,
      "tag_id": 1
    }
  },
  {
    "tag_id": 2,
    "name": "tag2",
    "createdAt": "2024-05-06T09:55:10.279Z",
    "updatedAt": "2024-05-06T09:55:10.279Z",
    "AnimeTag": {
      "id": 2,
      "anime_id": 1,
      "tag_id": 2
    }
  }], description: 'tags'})
  @BelongsToMany(() => Tag, () => AnimeTag)
  tags: Tag[]

  @ApiProperty({example: 12, description: 'Number of current episodes.'})
  @IsNumber()
  @Column({type: DataType.INTEGER, defaultValue: 0})
  episodesCurrent: number;

  @IsNumber()
  @ApiProperty({example: 12, description: 'Total number of episodes.'})
  @Column({type: DataType.INTEGER, defaultValue: 1})
  episodesTotal: number;

  @ApiProperty({example: 12, description: 'Rating'})
  @IsNumber()
  @Column({type: DataType.DECIMAL(2, 2), defaultValue: 0})
  rating: number;

  @ApiProperty({example: 'Description for anime title.', description: 'Description.'})
  @IsString()
  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @ApiProperty({example: 'sadsd-321wsada312-1231sada.jpg', description: 'Path to the image.'})
  @IsString()
  @Column({type: DataType.STRING})
  imagePath: string;

  @ApiProperty({example: 'Commnet for title', description: 'Comments.'})
  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => AnimeTitle, () => AnimeRelation, 'animeId', 'relatedAnimeId')
  relatedAnimes: AnimeTitle[];

  @ApiProperty({example: 1, description: 'Author id.'})
  @IsNumber()
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  user_id: number;

  @BelongsTo(() => User)
  author: User;
}