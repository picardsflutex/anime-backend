import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { AnimeTitle } from './anime.model';

@Table({ tableName: 'anime_relations' })
export class AnimeRelation extends Model<AnimeRelation> {
  @ForeignKey(() => AnimeTitle)
  @Column
  animeId: number;

  @ForeignKey(() => AnimeTitle)
  @Column
  relatedAnimeId: number;

  @Column
  order: number;
}