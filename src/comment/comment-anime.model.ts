import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { AnimeTitle } from 'src/anime/anime.model';
import { Comment } from './comment.model';

@Table({tableName:'anime_commnet', createdAt: false, updatedAt: false})
export class AnimeComment extends Model<AnimeComment> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => AnimeTitle)
  @Column({type: DataType.INTEGER})
  animeId: number;

  @ForeignKey(() => Comment)
  @Column({type: DataType.INTEGER})
  CommentId: number;
}