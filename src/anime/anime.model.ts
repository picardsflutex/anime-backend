import { Table, Column, Model, DataType, HasMany, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';

import { AnimeGenre } from 'src/genre/genre-anime.model';
import { AnimeTag } from 'src/tag/tag-anime.model';
import { AnimeRelation } from './anime-relation.model';

import { User } from 'src/users/users.model';
import { Comment } from 'src/comment/comment.model';
import { Genre } from 'src/genre/genre.model';
import { Tag } from 'src/tag/tag.model';

interface AnimeCreationAttrs{
  englishTitle: string;
  releaseYear: number;
  genres?: Genre[];
  tags?: Tag[];
  description: string;
  imagePath?: string;
  user_id: number;
}

@Table({tableName:'animes'})
export class AnimeTitle extends Model<AnimeTitle, AnimeCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  anime_id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  englishTitle: string;

  @Column({type: DataType.STRING, unique: true})
  originalTitle: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  releaseYear: number;

  @BelongsToMany(() => Genre, () => AnimeGenre)
  genres: Genre[]

  @BelongsToMany(() => Tag, () => AnimeTag)
  tags: Tag[]

  @Column({type: DataType.INTEGER, defaultValue: 0})
  episodesCurrent: number;

  @Column({type: DataType.INTEGER, defaultValue: 1})
  episodesTotal: number;

  @Column({type: DataType.DECIMAL(2, 2), defaultValue: 0})
  rating: number;

  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @Column({type: DataType.STRING})
  imagePath: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => AnimeTitle, () => AnimeRelation, 'animeId', 'relatedAnimeId')
  relatedAnimes: AnimeTitle[];

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  user_id: number;

  @BelongsTo(() => User)
  author: User;
}