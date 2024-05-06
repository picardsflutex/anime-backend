import { Genre } from "src/genre/genre.model";
import { Tag } from "src/tag/tag.model";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateAnimeDto {
  @IsString()
  readonly englishTitle: string;
  @IsString()
  @IsOptional()
  readonly originalTitle?: string;
  @IsInt()
  @Min(1950)
  @Max(2100)
  readonly releaseYear: number;
  readonly genres: string[];
  readonly tags: string[];
  @IsInt()
  @IsOptional()
  readonly episodesCurrent?: number;
  @IsInt()
  @IsOptional()
  readonly episodesTotal?: number;
  @IsString()
  readonly description: string;
}