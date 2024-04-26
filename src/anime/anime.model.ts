import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AnimeCreationAttrs{
  email: string;
  password: string;
}

@Table({tableName:'animes'})
export class Anime extends Model<Anime, AnimeCreationAttrs>{
  
  @ApiProperty({example: 1, description: 'Unique identifier'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  anime_id!: number;
}