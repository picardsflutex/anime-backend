import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import { AnimeTitle } from 'src/anime/anime.model';
import { AnimeTag } from './tag-anime.model';
import { IsString } from 'class-validator';

interface TagCreationAttrs{
  name: string;
}

@Table({tableName:'tags'})
export class Tag extends Model<Tag, TagCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  tag_id: number;

  @IsString()
  @Column({type: DataType.STRING, unique: true})
  name: string;

  @IsString()
  @BelongsToMany(() => AnimeTitle, () => AnimeTag)
  animeTitles: AnimeTitle[];
}
