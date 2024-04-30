import { Table, Column, Model, DataType, HasMany, BelongsToMany, BelongsTo, HasOne, ForeignKey } from 'sequelize-typescript';

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
  genres: Genre[];
  tag: Tag[];
  description: string;
  imagePath: string;
  userId: number;
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
  tag: Tag[]

  @Column({type: DataType.INTEGER, defaultValue: 0})
  episodesCurrent: number;

  @Column({type: DataType.INTEGER, defaultValue: 1})
  episodesTotal: number;

  @Column({type: DataType.DECIMAL(2, 2), defaultValue: 0})
  rating: number;

  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @Column({type: DataType.STRING, allowNull: false})
  imagePath: string;

  @HasMany(() => Comment)
  comment: Comment[];

  @BelongsToMany(() => AnimeTitle, () => AnimeRelation, 'animeId', 'relatedAnimeId')
  relatedAnimes: AnimeTitle[];

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

  @BelongsTo(() => User)
  author: User;
}