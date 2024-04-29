import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { AnimeTitle } from 'src/anime/anime.model';
import { Genre } from './genre.model';

@Table({tableName:'anime_genre', createdAt: false, updatedAt: false})
export class AnimeGenre extends Model<AnimeGenre> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => AnimeTitle)
  @Column({type: DataType.INTEGER})
  animeId: number;

  @ForeignKey(() => Genre)
  @Column({type: DataType.INTEGER})
  GenreId: number;
}