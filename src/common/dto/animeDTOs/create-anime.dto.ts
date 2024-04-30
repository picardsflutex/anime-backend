import { Genre } from "src/genre/genre.model";
import { Tag } from "src/tag/tag.model";
import { IsInt, IsString, Max, Min } from "class-validator";

export class CreateAnimeDto {
  @IsString()
  readonly englishTitle: string;
  @IsInt()
  @Min(1950)
  @Max(2100)
  readonly releaseYear: number;
  readonly genres: Genre[];
  readonly tag: Tag[];
  @IsString()
  readonly description: string;
  @IsString()
  readonly imagePath: string;
  @IsInt()
  readonly userId: number;
}