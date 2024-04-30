import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { AnimeTitle } from 'src/anime/anime.model';
import { User } from 'src/users/users.model';

interface CommentCreationAttrs{
  name: string;
  anime_id: number;
  user_id: number;
}

@Table({tableName:'comment'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  text: string;

  @ForeignKey(() => AnimeTitle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  anime_id: number;

  @BelongsTo(() => AnimeTitle)
  animeTitle: AnimeTitle;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id: number;
  
  @BelongsTo(() => User)
  author: User;
}