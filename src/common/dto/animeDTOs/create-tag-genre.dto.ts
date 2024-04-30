import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenreTagDto {
  @ApiProperty({example: 'Fantasy', description: 'Name of Genre or Tag', required: true})
  @IsString()
  readonly name: string;
}