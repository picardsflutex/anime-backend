import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { AnimeTitle } from 'src/anime/anime.model';
import { Tag } from './tag.model';

@Table({tableName:'anime_tag', createdAt: false, updatedAt: false})
export class AnimeTag extends Model<AnimeTag> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => AnimeTitle)
  @Column({type: DataType.INTEGER})
  animeId: number;

  @ForeignKey(() => Tag)
  @Column({type: DataType.INTEGER})
  TagId: number;
}