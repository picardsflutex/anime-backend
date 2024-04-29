import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import { AnimeTitle } from 'src/anime/anime.model';
import { AnimeTag } from './tag-anime.model';

interface TagCreationAttrs{
  name: string;
}

@Table({tableName:'tags'})
export class Tag extends Model<Tag, TagCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({type: DataType.STRING, unique: true})
  name: string;

  @BelongsToMany(() => AnimeTitle, () => AnimeTag)
  animeTitles: AnimeTitle[];
}
