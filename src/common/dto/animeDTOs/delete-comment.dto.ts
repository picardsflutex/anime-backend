import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteCommentDto {
  @ApiProperty({ example: 1, description: 'comment id', required: true })
  @IsNumber({}, { message: 'Incorrect comment id.' })
  readonly comment_id: number;
}
