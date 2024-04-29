import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import { AnimeTitle } from 'src/anime/anime.model';
import { AnimeGenre } from './genre-anime.model';

interface GenreCreationAttrs{
  name: string;
}

@Table({tableName:'genres'})
export class Genre extends Model<Genre, GenreCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({type: DataType.STRING, unique: true})
  name: string;

  @BelongsToMany(() => AnimeTitle, () => AnimeGenre)
  animeTitles: AnimeTitle[];
}