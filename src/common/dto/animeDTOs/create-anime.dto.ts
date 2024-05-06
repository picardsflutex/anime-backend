import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAnimeDto {
  @ApiProperty({example: 1, description: 'Unique identifier', required: true})
  @IsString()
  readonly englishTitle: string;
  @ApiProperty({example: "Original title", description: 'Original title of anime'})
  @IsString()
  @IsOptional()
  readonly originalTitle?: string;
  @ApiProperty({example: 2024, description: 'Year of release', required: true})
  @IsInt()
  @Min(1950)
  @Max(2100)
  readonly releaseYear: number;
  @ApiProperty({example: ['genre1', 'genre2'], description: 'genres', required: true})
  readonly genres: string[];
  @ApiProperty({example: ['tag1', 'tag2'], description: 'tags', required: true})
  readonly tags: string[];
  @ApiProperty({example: 12, description: 'Number of current episodes.'})
  @IsInt()
  @IsOptional()
  readonly episodesCurrent?: number;
  @ApiProperty({example: 12, description: 'Total number of episodes.'})
  @IsInt()
  @IsOptional()
  readonly episodesTotal?: number;
  @ApiProperty({example: 'Description for anime title.', description: 'Description.'})
  @IsString()
  readonly description: string;
}