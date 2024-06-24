import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 1, description: 'anime id', required: true })
  @IsNumber({}, { message: 'Incorrect anime id.' })
  readonly anime_id: number;
  @ApiProperty({ example: 1, description: 'Text of comment', required: true })
  @IsString({ message: 'Incorrect value.' })
  @Length(0, 500, { message: 'Max length 500.' })
  readonly text: string;
}
