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
  @IsString()
  readonly releaseYear: string;
  @ApiProperty({example: ['genre1', 'genre2'], description: 'genres', required: true})
  readonly genres: string[];
  @ApiProperty({example: ['tag1', 'tag2'], description: 'tags', required: true})
  readonly tags: string[];
  @ApiProperty({example: 12, description: 'Total number of episodes.'})
  @IsString()
  readonly episodesTotal: string;
  @ApiProperty({example: 'Description for anime title.', description: 'Description.'})
  @IsString()
  readonly description: string;
}