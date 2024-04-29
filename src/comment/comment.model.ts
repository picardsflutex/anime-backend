import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import { AnimeTitle } from 'src/anime/anime.model';
import { AnimeComment } from './comment-anime.model';

interface CommentCreationAttrs{
  name: string;
}

@Table({tableName:'comment'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({type: DataType.STRING})
  text: string;

  @BelongsToMany(() => AnimeTitle, () => AnimeComment)
  animeTitles: AnimeTitle[];
}